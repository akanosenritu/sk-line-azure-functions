import {LineWebhookEventBase} from "./LineWebhookEventBase"

export type PostbackEventData = {
  type: "postback",
  id: string,
  embeds?: {
    name: string,
    value: string
  }[]
}

export type PostbackEvent = LineWebhookEventBase & {
  type: "postback",
  replyToken: string,
  postback: {
    data: string
  }
}