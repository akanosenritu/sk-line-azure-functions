import {BlobServiceClient} from "@azure/storage-blob"
import {getEnvironmentVariableValue} from "../environmentVariables"

export const blobServiceClient = BlobServiceClient
  .fromConnectionString(getEnvironmentVariableValue("AZURE_STORAGE_CONNECTION_STRING"))

