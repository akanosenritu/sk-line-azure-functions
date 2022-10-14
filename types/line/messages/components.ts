import {MessageAction, PostbackAction} from "../actions/lineActions"

type ButtonComponent = {
  type: "button",
  action: PostbackAction | MessageAction,
  flex?: number,
  margin?: number,
  position?: number,
  height?: "sm" | "md",
  style?: "primary" | "secondary" | "link",
  color?: string,  // hex color
}


// TODO: implement image component
export type ImageComponent = any

type TextComponent = {
  type: "text",
  text: string,
  wrap?: boolean,
  size?: "sm" | "md" | "lg"
}

type VerticalBoxComponent = {
  type: "box",
  layout: "vertical",
  contents: (BoxComponent | ButtonComponent | TextComponent | ImageComponent)[],
}

type HorizontalBoxComponent = {
  type: "box",
  layout: "horizontal",
  contents: (BoxComponent | ButtonComponent | TextComponent | ImageComponent)[],
}

export type BoxComponent = VerticalBoxComponent | HorizontalBoxComponent
