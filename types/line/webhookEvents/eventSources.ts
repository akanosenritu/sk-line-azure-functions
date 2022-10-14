export type LineWebhookEventSource = {
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