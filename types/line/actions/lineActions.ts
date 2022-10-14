export type PostbackAction = {
  type: "postback",
  label: string,
  data: string,
  displayText?: string,
  inputOption?: "closeRichMenu" | "openRichMenu" | "openKeyboard" | "openVoice",
  fillInText?: string,
}

export type MessageAction = {
  type: "message",
  label: string,
  text: string,
}