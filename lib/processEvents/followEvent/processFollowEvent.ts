import {FollowEvent} from "../../../types/line/webhookEvents/FollowEvent"
import {sendReplyMessages} from "../../line/sendReplyMessages"
import {getReplyMessages} from "../../messages/getReplyMessages"

// if a user follows or unblocks the official account,
// send a message that requests the user to submit the registration information, i.e.:
//   * registration number
//   * full name
export const processFollowEvent  = async (followEvent: FollowEvent) => {
  const replyToken = followEvent.replyToken
  
  const replyMessageKey = `follow-&KfdPP9LzH`
  const messages = getReplyMessages(replyMessageKey, [])
  
  await sendReplyMessages(messages, replyToken)
}