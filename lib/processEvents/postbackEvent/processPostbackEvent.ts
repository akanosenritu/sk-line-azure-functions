import {PostbackEvent, PostbackEventData} from "../../../types/lineWebhookEvent/postbackEvent"
import {sendReplyMessages} from "../../lineMessages/sendReplyMessages"

export const processPostbackEvent = async (event: PostbackEvent) => {
  const postbackData: PostbackEventData = JSON.parse(event.postback.data)
  const {type, question, data} = postbackData
  const replyToken = event.replyToken
  
  if (type === "buttonClick" && question === "isRegistered") {
    if (data === "yes") {
      await sendReplyMessages([{
        type: "text",
        text: "データベースへの紐付けを行いますので、氏名・電話番号を必ずLINEしてください。"
      }, {
        type: "text",
        text: "今後はこちらよりお仕事情報の閲覧が可能となります。お仕事へのお申し込みをお待ちしております！"
      }], replyToken)
    } else {
      await sendReplyMessages([{
        type: "text",
        text: "最下部のメニューバーから「スタッフ登録」を押して登録をお願いします。"
      }], replyToken)
    }
  }
}