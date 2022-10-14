### Setup
Environment variables to be defined:
  * LINE_CHANNEL_ID: from https://manager.line.biz/account/@388efjxa/setting/messaging-api
  * LINE_CHANNEL_SECRET: from https://manager.line.biz/account/@388efjxa/setting/messaging-api
  * LINE_ACCESS_TOKEN: from https://developers.line.biz/console/channel/1657553109/messaging-api
  * AZURE_STORAGE_CONNECTION_STRING: from Azure Portal
  * AZURE_COSMOS_DB_CONNECTION_STRING: from Azure portal


### Functions
This function app currently has two functions:
  * receive-webhook: receives webhook event from the official line account and queue the event in the azure storage.
  * consume-queue: receives an enqueue event and take an action (send a reply, etc.)
