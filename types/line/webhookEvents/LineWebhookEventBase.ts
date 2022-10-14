import {LineWebhookEventSource} from "./eventSources"

export type LineWebhookEventBase = {
  mode: string,
  timestamp: number,
  source: LineWebhookEventSource,
  webhookEventId: string,
  deliveryContext: {
    isRedelivery: boolean
  }
}
