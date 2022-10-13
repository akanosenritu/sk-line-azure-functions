import {FollowEvent} from "../../../types/lineWebhookEvent/FollowEvent"
import {sendReplyMessages} from "../../lineMessages/sendReplyMessages"
import {FlexMessage} from "../../../types/lineMessages/flexMessage"
import * as message from "../../../messages/onFollowFlexMessage.json"

// if a user follows or unblocks the official account,
// send a message that requests the user to submit the registration information, i.e.:
//   * registration number
//   * full name
export const processFollowEvent  = async (followEvent: FollowEvent) => {
  const replyToken = followEvent.replyToken
  
  const flexMessage: FlexMessage = {
    type: "flex",
    altText: "お友達追加ありがとうございます",
    contents: message
  }
  
  await sendReplyMessages([flexMessage], replyToken)
}