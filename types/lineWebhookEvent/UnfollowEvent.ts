import {LineWebhookEventBase} from "./LineWebhookEventBase"

export type UnfollowEvent = LineWebhookEventBase & {
  type: "unfollow"
}