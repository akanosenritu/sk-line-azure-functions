import {FlexMessageObject} from "../../types/line/messages/flexMessageObject"
import {TextMessage} from "../../types/line/messages/textMessage"
import fetch from "cross-fetch"
import {getEnvironmentVariableValue} from "../environmentVariables"

const MESSAGE_REPLY_URL = "https://api.line.me/v2/bot/message/reply"
const CHANNEL_ACCESS_TOKEN = getEnvironmentVariableValue("LINE_CHANNEL_ACCESS_TOKEN")

export const sendReplyMessages = async (messages: (TextMessage | FlexMessageObject)[], replyToken: string) => {
  return await fetch(MESSAGE_REPLY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: messages
    })
  })
}