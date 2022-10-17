import {AzureFunction, Context, HttpRequest, HttpResponse} from "@azure/functions"
import {blobServiceClient} from "../lib/azureStorage/azureStorage"
import {parse} from "csv-parse"
import {getFollowersList} from "../lib/line/getFollowersList"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<HttpResponse> {
  // retrieve users data from azure storage
  const usersDataContainerClient = blobServiceClient.getContainerClient("users-data")
  const staffsDataCsvFileBlobClient = await usersDataContainerClient.getBlobClient("staffsData.csv")
  const staffsDataCsvFileBuffer = await staffsDataCsvFileBlobClient.downloadToBuffer()
  const staffsDataCsvFile = staffsDataCsvFileBuffer.toString()

  // retrieve followed users list from LINE
  const lineFollowerUserIds = await getFollowersList()

  // retrieve connections data from azure storage
  const connectionsDataFileBlobClient = await usersDataContainerClient.getBlobClient("connections.json")
  const connectionsDataFileBuffer = await connectionsDataFileBlobClient.downloadToBuffer()
  const connectionsData: {userIds: string[], connections: {[userId: string]: string}} = JSON.parse(connectionsDataFileBuffer.toString())

  // parse the csv file
  const parser = parse(staffsDataCsvFile)

  // aggregate the data
  for await (let row of parser) {
    row
  }

  return {
    status: 200,
    body: JSON.stringify({userIds: lineFollowerUserIds}),
    headers: {
      "Content-Type": "application/json"
    }
  }
}

export default httpTrigger