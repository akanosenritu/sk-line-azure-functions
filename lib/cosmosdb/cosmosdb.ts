import {CosmosClient} from "@azure/cosmos"
import {getEnvironmentVariableValue} from "../environmentVariables"

export const cosmosClient = new CosmosClient(getEnvironmentVariableValue("AZURE_COSMOS_DB_CONNECTION_STRING"))