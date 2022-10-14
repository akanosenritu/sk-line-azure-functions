import {LineWebhookEventBase} from "./LineWebhookEventBase"

const ignoredEventTypes = [
  "unsend", "join", "leave", "memberJoined", "memberLeft", "videoPlayComplete", "beacon", "accountLink", "things"
] as const

type IgnoredEventType = typeof ignoredEventTypes[number]

export type IgnoredEvent = LineWebhookEventBase & {
  type: IgnoredEventType
}