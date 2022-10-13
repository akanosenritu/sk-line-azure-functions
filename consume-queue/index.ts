import { AzureFunction, Context } from "@azure/functions"
import {LineWebhookEvent} from "../types/lineWebhookEvent/lineWebhookEvent"
import {processEvent} from "../lib/processEvents/processEvent"

const queueTrigger: AzureFunction = async function (context: Context, myQueueItem: any): Promise<void> {
  context.log(typeof  myQueueItem)
  const event = myQueueItem as LineWebhookEvent
  await processEvent(event)
}

export default queueTrigger
