import {LineWebhookEventBase} from "./LineWebhookEventBase"

export type FollowEvent = LineWebhookEventBase & {
  type: "follow",
  replyToken: string,
}