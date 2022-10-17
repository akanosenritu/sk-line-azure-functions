import fetch from "cross-fetch"
import {getEnvironmentVariableValue} from "../environmentVariables"

const ENDPOINT = "https://api.line.me/v2/bot/followers/ids?limit=1000"

export const getFollowersList = async (): Promise<string[]> => {
  // retrieve the userIds of the followers
  const response = await fetch(ENDPOINT, {
    headers: {
      "Authorization": `Bearer ${getEnvironmentVariableValue("LINE_CHANNEL_ACCESS_TOKEN")}`
    }
  })
  const data: {userIds: string[], next?: string} = await response.json()

  // if no continuation was given, return the userIds
  if (!data.next) return data.userIds

  // otherwise, try to retrieve all the userIds
  let next = data.next
  const userIds = data.userIds
  while (next) {
    const continuedResponse = await fetch(ENDPOINT + "&start=" + next, {
      headers: {
        "Authorization": `Bearer ${getEnvironmentVariableValue("LINE_CHANNEL_ACCESS_TOKEN")}`
      }
    })
    const continuedData: {userIds: string[], next?: string} = await continuedResponse.json()
    userIds.splice(userIds.length, 0, ...continuedData.userIds)
    next = continuedData.next ?? ""
  }
  return userIds
}