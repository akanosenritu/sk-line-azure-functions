import {OutboundMessageObject} from "../line/messages/message"
import {MessageObject} from "../line/webhookEvents/messageEvent"
import {LineWebhookEventSource} from "../line/webhookEvents/eventSources"

export type UnsavedCosmosDBLineIncomingMessageItemV1 = {
  direction: "in",
  message: MessageObject,
  source: LineWebhookEventSource,
  timestamp: number,
  type: "message",
  version: 1
}

export type SavedCosmosDBLineIncomingMessageItemV1 = {
  id: string
} & UnsavedCosmosDBLineIncomingMessageItemV1

export type UnsavedCosmosDBLineOutboundMessageItemV1 = {
  direction: "out",
  message: OutboundMessageObject,
  to: string  // userId
  timestamp: number,
  type: "message",
  version: 1
}

export type SavedCosmosDBLineOutboundMessageItemV1 = {
  id: string,
} & UnsavedCosmosDBLineOutboundMessageItemV1

export type CosmosDBLineMessageItemV1 = SavedCosmosDBLineIncomingMessageItemV1 | SavedCosmosDBLineOutboundMessageItemV1