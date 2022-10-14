import {FollowEvent} from "../../../types/line/webhookEvents/FollowEvent"
import {sendReplyMessages} from "../../lineMessages/sendReplyMessages"
import {FlexMessageObject} from "../../../types/line/messages/flexMessageObject"
import * as message from "../../../messages/onFollowFlexMessage.json"

// if a user follows or unblocks the official account,
// send a message that requests the user to submit the registration information, i.e.:
//   * registration number
//   * full name
export const processFollowEvent  = async (followEvent: FollowEvent) => {
  const replyToken = followEvent.replyToken
  
  const flexMessage: FlexMessageObject = {
    type: "flex",
    altText: "お友達追加ありがとうございます",
    contents: message
  }
  
  await sendReplyMessages([flexMessage], replyToken)
}