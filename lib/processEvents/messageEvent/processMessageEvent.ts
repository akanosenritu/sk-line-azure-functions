import {MessageEvent} from "../../../types/line/webhookEvents/messageEvent"
import {processTextMessage} from "./textMessage/processTextMessage"
import {UnsavedCosmosDBLineIncomingMessageItemV1} from "../../../types/cosmosdb/CosmosDBLineMessageItem"
import {cosmosClient} from "../../cosmosdb/cosmosdb"

export const processMessageEvent = async (messageEvent: MessageEvent) => {
  const messageType = messageEvent.message.type

  // store the message in the cosmos db
  const messageItem: UnsavedCosmosDBLineIncomingMessageItemV1 = {
    direction: "in",
    message: messageEvent.message,
    source: messageEvent.source,
    timestamp: messageEvent.timestamp,
    type: "message",
    version: 1
  }
  await cosmosClient.database("sk").container("LineMessages").items.create(messageItem)

  switch (messageType) {
    case "text":
      return processTextMessage(messageEvent.message, messageEvent.replyToken)
    default:
      return
  }
}