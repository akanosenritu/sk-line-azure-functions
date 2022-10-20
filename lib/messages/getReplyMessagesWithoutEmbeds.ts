import * as replyMessages from "../../messagesStore/replyMessages.json"
import {FlexMessageObject} from "../../types/line/messages/flexMessageObject"
import {TextMessageObject} from "../../types/line/webhookEvents/messageEvent"

export const getReplyMessagesWithoutEmbeds = (key: string): (TextMessageObject | FlexMessageObject)[] => {
  const reply = replyMessages[key]
  if (!reply) {
    return [{type: "text", text: "返信テキストが定義されていません。", id: "temporary"}]
  }
  return reply.messages
}