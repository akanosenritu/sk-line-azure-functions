const ENVIRONMENT_VARIABLES = [
  "LINE_CHANNEL_ID",
  "LINE_CHANNEL_SECRET",
  "LINE_CHANNEL_ACCESS_TOKEN",
  "AZURE_STORAGE_CONNECTION_STRING",
  "AZURE_COSMOS_DB_CONNECTION_STRING",
] as const

type EnvironmentVariable = typeof ENVIRONMENT_VARIABLES[number]

export const getEnvironmentVariableValue = (environmentVariable: EnvironmentVariable): string => {
  const value = process.env[environmentVariable]
  if (value) return value
  throw new Error(`Environment variable ${environmentVariable} is not defined.`)
}