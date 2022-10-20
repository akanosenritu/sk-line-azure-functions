import {PostbackEvent, PostbackEventData} from "../../../types/line/webhookEvents/postbackEvent"
import {sendReplyMessages} from "../../line/sendReplyMessages"
import {getReplyMessages} from "../../messages/getReplyMessages"

export const processPostbackEvent = async (event: PostbackEvent) => {
  const userId = event.source.type === "user" ? event.source.userId: "nobody"
  const postbackData: PostbackEventData = JSON.parse(event.postback.data)
  const {id} = postbackData
  
  // create the embedded data
  const embeds = postbackData.embeds ? postbackData.embeds: []
  embeds.splice(embeds.length, 0, {name: "lineUserId", value: userId})
  
  const replyToken = event.replyToken
  const replyMessageKey = `postback-${id}`
  const messages = getReplyMessages(replyMessageKey, embeds)
  
  await sendReplyMessages(messages, replyToken)
}