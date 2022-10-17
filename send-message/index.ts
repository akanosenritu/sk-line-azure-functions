import {AzureFunction, Context, HttpRequest, HttpResponse} from "@azure/functions"
import {sendPushMessages} from "../lib/line/sendPushMessages"
import {cosmosClient} from "../lib/cosmosdb/cosmosdb"
import {UnsavedCosmosDBLineOutboundMessageItemV1} from "../types/cosmosdb/CosmosDBLineMessageItem"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<HttpResponse> {
  const payload = req.body

  // dispatch the request
  const result = await sendPushMessages(payload.messages, payload.userId)

  // if the push was successful, record it in the cosmosdb
  const operations = payload.messages
    .map(message => {
      const item: UnsavedCosmosDBLineOutboundMessageItemV1 = {
        direction: "out",
        message: message,
        to: payload.userId,
        timestamp: Date.now(),
        type: "message",
        version: 1,
      }
      return item
    })
    .map(item => ({
      operationType: "Create",
      resourceBody: item,
    }))

  await cosmosClient
    .database("sk")
    .container("LineMessages")
    .items
    .bulk(operations)

  return {
    status: result.status,
    body: JSON.stringify(await result.json()),
    headers: {
      "Content-Type": "application/json"
    }
  }
}

export default httpTrigger