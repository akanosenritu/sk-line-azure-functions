import {TextMessageObject} from "../../../../types/lineWebhookEvent/messageEvent"
import {getEnvironmentVariableValue} from "../../../environmentVariables"
import {text} from "stream/consumers"
import fetch from "cross-fetch"
import {FlexMessage} from "../../../../types/lineMessages/flexMessage"
import {sendReplyMessages} from "../../../lineMessages/sendReplyMessages"

// currently do nothing
export const processTextMessage = async (textMessage: TextMessageObject, replyToken: string) => {
}
