import {CosmosClient} from "@azure/cosmos"
import {getEnvironmentVariableValue} from "../environmentVariables"

export const cosmosClient = new CosmosClient(getEnvironmentVariableValue("AZURE_COSMOS_DB_CONNECTION_STRING"))

// in the "line" database
export const lineMessagesContainerClient = cosmosClient.database("line").container("Messages")
export const lineEventsContainerClient = cosmosClient.database("line").container("Events")

// in the "requests" database
export const confirmationRequestContainerClient = cosmosClient.database("requests").container("Confirmation")