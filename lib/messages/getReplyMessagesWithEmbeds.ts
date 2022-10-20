import * as replyMessages from "../../messagesStore/replyMessages.json"
import {FlexMessageObject} from "../../types/line/messages/flexMessageObject"
import {TextMessageObject} from "../../types/line/webhookEvents/messageEvent"

export const getReplyMessagesWithEmbeds = (key: string, embeds: {name: string, value: string}[]): (TextMessageObject | FlexMessageObject)[] => {
  const reply = replyMessages[key]
  if (!reply) {
    return [{type: "text", text: "返信テキストが定義されていません。", id: "temporary"}]
  }
  
  // this is too hacky, I suppose
  let jsonText = JSON.stringify(reply)
  for (const embed of embeds) {
    jsonText = jsonText.replace(`$[${embed.name}]$`, embed.value)
  }
  const {messages} = JSON.parse(jsonText)
  return messages
}