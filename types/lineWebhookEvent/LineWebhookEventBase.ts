// user, group, or
type LineWebhookEventSource = {
  type: "user",
  userId: string,
} | {
  type: "group",
  groupId: string,
  userid?: string,
} | {
  type: "room",
  roomId: string,
  userId?: string
}

export type LineWebhookEventBase = {
  mode: string,
  timestamp: number,
  source: LineWebhookEventSource,
  webhookEventId: string,
  deliveryContext: {
    isRedelivery: boolean
  }
}
