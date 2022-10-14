import {LineWebhookEvent} from "../../types/line/webhookEvents/lineWebhookEvent"
import {processMessageEvent} from "./messageEvent/processMessageEvent"
import {processFollowEvent} from "./followEvent/processFollowEvent"
import {processPostbackEvent} from "./postbackEvent/processPostbackEvent"

// dispatch the event depending on the type of the event
export const processEvent = async (event: LineWebhookEvent) => {
  const eventType = event.type
  switch (eventType) {
    case "message":
      return processMessageEvent(event)
    case "follow":
      return processFollowEvent(event)
    case "postback":
      return processPostbackEvent(event)
    default:
      return
  }
}