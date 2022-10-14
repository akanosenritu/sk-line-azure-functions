import {LineWebhookEventBase} from "./LineWebhookEventBase"

export type TextMessageObject = {
  id: string,
  type: "text",
  text: string,
  emojis?: unknown[],
  mention?: unknown,
}

export type PictureMessageObject = {
  id: string,
  type: "image",
  contentProvider: {
    type: "line" | "external",
    originalContentUrl: string,
    previewImageUrl: string
  },
  imageSet: {
    id: string,
    index: number,
    total: number
  }
}

export type VideoMessageObject = {
  id: string,
  type: "video",
  duration: number,
  contentProvider: {
    type: "line" | "external",
    originalContentUrl: string,
    previewImageUrl: string
  }
}

export type AudioMessageObject = {
  id: string,
  type: "audio",
  duration: number,
  contentProvider: {
    type: "line" | "external",
    originalContentUrl: string,
  }
}

export type FileMessageObject = {
  id: string,
  type: "file",
  fileName: string,
  fileSize: number
}

export type LocationMessageObject = {
  id: string,
  type: "location",
  title: string,
  address: string,
  latitude: number,
  longitude: number
}

export type StickerMessageObject = {
  id: string,
  type: "sticker",
  packageId:  string,
  stickerId: string,
  stickerResourceType: string,
  keywords: string[],
  text: string,
}

export type MessageObject = TextMessageObject | PictureMessageObject | VideoMessageObject | AudioMessageObject | FileMessageObject | LocationMessageObject | StickerMessageObject

export type MessageEvent = LineWebhookEventBase & {
  type: "message",
  replyToken: string,
  message: MessageObject
}