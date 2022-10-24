import {AzureFunction, Context, HttpRequest, HttpResponse} from "@azure/functions"
import {sendPushMessages} from "../lib/line/sendPushMessages"
import {UnsavedCosmosDBLineOutboundMessageItemV2} from "../types/cosmosdb/CosmosDBLineMessageItem"
import {confirmationRequestContainerClient, lineMessagesContainerClient} from "../lib/cosmosdb/cosmosdb"
import {getReplyMessages} from "../lib/messages/getReplyMessages"
import {UnsavedCosmosDBConfirmationRequestRequestedItemV1} from "../types/cosmosdb/CosmosDBConfirmationRequestItem"

type Payload = {
  messageText: string,
  userId: string
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<HttpResponse> {
  // TODO: validate the payload
  const payload: Payload = req.body
  
  // 確認リクエストを作成する
  const confirmationRequest: UnsavedCosmosDBConfirmationRequestRequestedItemV1 = {
    status: "requested",
    timestamp: Date.now().toString(10),
    version: 1,
    message: {
      type: "text",
      text: payload.messageText,
    },
    requestConfirmationFrom: {
      platform: "line",
      type: "user",
      userId: payload.userId
    },
    requestedFrom: {
      type: "bot",
      platform: "sk"
    }
  }
  // 確認リクエストを CosmosDB に保存する
  const {resource: {id: confirmationRequestId}} = await confirmationRequestContainerClient.items.create(confirmationRequest)
  // 確認リクエストのURLを作成する
  const confirmationRequestUrl = `https://sk-line-management.vercel.app/requests/confirmation/${confirmationRequestId}`
  
  // CosmosDBにメッセージ本文を保存し、id の割当を受ける
  // 送信はまだされていないので sendStatus を notSent にする
  const textMessageItem: UnsavedCosmosDBLineOutboundMessageItemV2 = {
    direction: "out",
    message: {
      type: "text",
      text: payload.messageText
    },
    to: payload.userId,
    timestamp: Date.now(),
    type: "message",
    version: 2,
    sendStatus: "notSent",
    linkedConfirmationRequestId: confirmationRequestId
  }
  const {resource: createdMessageItem} = await lineMessagesContainerClient.items.create(textMessageItem)
  
  // 確認メッセージを作成する
  const messageId = createdMessageItem.id
  const confirmationMessages = getReplyMessages("confirmation-pagNM9hWTR", [
    {name: "messageText", value: payload.messageText},
    {name: "confirmationRequestUrl", value: confirmationRequestUrl}
  ])
  
  // LINE Messaging API にメッセージの送信リクエストを送る
  const result = await sendPushMessages(
    confirmationMessages,
    payload.userId
  )
  
  if (result.ok) {
    // CosmosDB のMessageItemに送信済みステータスを反映する
    await lineMessagesContainerClient
      .item(messageId, messageId)
      .patch([
        {op: "replace", path: "/sendStatus", value: "sent"}
      ])
    
    // httpレスポンスを返す
    return {
      status: 200,
    }
  } else {
    // CosmosDB のMessageItemに送信失敗ステータスを反映する
    await lineMessagesContainerClient
      .item(messageId, messageId)
      .patch([
        {op: "replace", path: "/sendStatus", value: "sendFailed"}
      ])
    
    // httpレスポンスを返す
    return {
      status: 500,
    }
  }
}

export default httpTrigger