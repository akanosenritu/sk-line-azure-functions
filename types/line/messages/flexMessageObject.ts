import {BoxComponent, ImageComponent} from "./components"

export type Bubble = {
  type: "bubble",
  size?: "nano" | "micro" | "kilo" | "mega" | "giga",
  direction?: "ltr" | "rtl",
  header?: BoxComponent,
  hero?: BoxComponent | ImageComponent,
  body: BoxComponent,
  footer?: BoxComponent,
}

export type FlexMessageObject = {
  type: "flex",
  altText: string,
  contents: any
}