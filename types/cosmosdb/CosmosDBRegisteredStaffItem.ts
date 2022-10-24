export type Name = {
  lastName: {
    text: string,
    kana: string,
  },
  firstName: {
    text: string,
    kana: string
  }
}

export type CosmosDBRegisteredStaffItemBase = {
  registrationDate: string,  // should be formatted like yyyy-MM-dd
  registrationNumber: string,  // 0-padded 6 or 7 digits number
  name: Name,
  birthDate: string,  // should be formatted like yyyy-MM-dd
  gender: "male" | "female",
  phoneNumber: string,  // should be formatted as a string of 10 or 11 digits numbers
  email: string,
  nearestStation: string,
  lineUserId: string | null,
}

export type CosmosDBRegisteredStaffItem = CosmosDBRegisteredStaffItemBase & {
  id: string,
}