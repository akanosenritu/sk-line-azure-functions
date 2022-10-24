import {Bot, LineUser} from "../user"

export type UnsavedCosmosDBConfirmationRequestItemBaseV1 = {
  requestedFrom: Bot,
  message: {
    type: "text",
    text: string,
  },
  requestConfirmationFrom: LineUser,
  timestamp: string,
  version: 1,
}

export type UnsavedCosmosDBConfirmationRequestRequestedItemV1 = UnsavedCosmosDBConfirmationRequestItemBaseV1 & {
  status: "requested"
}

export type UnsavedCosmosDBConfirmationRequestConfirmedItemV1 = UnsavedCosmosDBConfirmationRequestItemBaseV1 & {
  status: "confirmed",
  confirmed: {
    timestamp: string,
    by: LineUser
  }
}

export type UnsavedCosmosDBConfirmationRequestRejectedItemV1 = UnsavedCosmosDBConfirmationRequestItemBaseV1 & {
  status: "rejected",
  rejected: {
    timestamp: string,
    by: LineUser
  }
}

export type UnsavedCosmosDBConfirmationRequestItemV1 = UnsavedCosmosDBConfirmationRequestRequestedItemV1 | UnsavedCosmosDBConfirmationRequestConfirmedItemV1 | UnsavedCosmosDBConfirmationRequestRejectedItemV1

export type CosmosDBConfirmationRequestItemV1 = UnsavedCosmosDBConfirmationRequestItemV1 & {
  id: string,
}