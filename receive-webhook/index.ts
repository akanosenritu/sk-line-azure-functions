import {AzureFunction, Context, HttpRequest, HttpResponse} from "@azure/functions"
import {QueueServiceClient} from "@azure/storage-queue"
import * as crypto from "crypto"
import {getEnvironmentVariableValue} from "../lib/environmentVariables"
import {OperationInput} from "@azure/cosmos"
import {lineEventsContainerClient} from "../lib/cosmosdb/cosmosdb"

const QUEUE_NAME = "line-incoming-messages"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<HttpResponse> {
  const response: HttpResponse = {
    status: 200,
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json"
    }
  }
  
  // make sure the necessary environment variables are defined
  let lineChannelSecret
  let azureStorageConnectionString
  try {
    lineChannelSecret = getEnvironmentVariableValue("LINE_CHANNEL_SECRET")
    azureStorageConnectionString = getEnvironmentVariableValue("AZURE_STORAGE_CONNECTION_STRING")
  } catch (e) {
    return {
      ...response,
      status: 500,
      body: JSON.stringify({error: e})
    }
  }

  // confirm the request was sent from LINE server by checking the signature
  const signatureAssumed = crypto
    .createHmac("SHA256", lineChannelSecret)
    .update(req.rawBody)
    .digest("base64")
  const signatureInHeader = req.headers["x-line-signature"]
  if (signatureAssumed !== signatureInHeader) {
    return {
      ...response,
      status: 400,
      body: JSON.stringify({error: "The signatures don't match."})
    }
  }
  
  // log the incoming message
  context.log(req.body)
  
  // if no events are included in the request, return an empty response
  const events = req.body["events"]
  if (!events) return response

  // store the events in the container
  const operations: OperationInput[] = events.map(event => ({
    operationType: "Create",
    resourceBody: event
  }))
  await lineEventsContainerClient.items.bulk(operations)

  // set up the queue storage
  const queueServiceClient = QueueServiceClient.fromConnectionString(azureStorageConnectionString)
  const queueClient = queueServiceClient.getQueueClient(QUEUE_NAME)
  
  const messages = events.map(event => Buffer.from(JSON.stringify(event)).toString("base64"))
  // enqueue the events
  await Promise.all(messages.map(message => queueClient.sendMessage(message)))
  // return the response
  return response
}

export default httpTrigger