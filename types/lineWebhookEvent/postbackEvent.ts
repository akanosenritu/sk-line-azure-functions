import {LineWebhookEventBase} from "./LineWebhookEventBase"

export type PostbackEventData = {
  type: "buttonClick",
  question: "isRegistered",
  data: "yes" | "no",
}

export type PostbackEvent = LineWebhookEventBase & {
  type: "postback",
  replyToken: string,
  postback: {
    data: string
  }
}