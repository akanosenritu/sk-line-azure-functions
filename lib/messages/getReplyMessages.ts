import * as replyMessages from "../../messagesStore/replyMessages.json"
import {FlexMessageObject} from "../../types/line/messages/flexMessageObject"
import {TextMessageObject} from "../../types/line/webhookEvents/messageEvent"
import {getReplyMessagesWithEmbeds} from "./getReplyMessagesWithEmbeds"
import {getReplyMessagesWithoutEmbeds} from "./getReplyMessagesWithoutEmbeds"

export const getReplyMessages = (key: string, embeds: {name: string, value: string}[]): (TextMessageObject | FlexMessageObject)[] => {
  const reply = replyMessages[key]
  if (!reply) {
    return [{type: "text", text: "返信テキストが定義されていません。", id: "temporary"}]
  }
  
  if (reply.embeds && reply.embeds.length > 0) {
    return getReplyMessagesWithEmbeds(key, embeds)
  }
  return getReplyMessagesWithoutEmbeds(key)
}