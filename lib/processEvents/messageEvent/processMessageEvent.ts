import {MessageEvent} from "../../../types/lineWebhookEvent/messageEvent"
import {processTextMessage} from "./textMessage/processTextMessage"

export const processMessageEvent = async (messageEvent: MessageEvent) => {
  const messageType = messageEvent.message.type
  switch (messageType) {
    case "text":
      return processTextMessage(messageEvent.message, messageEvent.replyToken)
    default:
      return
  }
}