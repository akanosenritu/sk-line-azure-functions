import {AzureFunction, Context, HttpRequest, HttpResponse} from "@azure/functions"
import * as yup from "yup"
import {cosmosClient} from "../lib/cosmosdb/cosmosdb"
import {SqlQuerySpec} from "@azure/cosmos"

const staffSchema = yup.object({
  registrationDate: yup.string().defined().matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
  registrationNumber: yup.string().required().matches(/^[0-9]{6,7}$/),
  name: yup.object({
    lastName: yup.object({
      text: yup.string().required(),
      kana: yup.string().required(),
    }).required(),
    firstName: yup.object({
      text: yup.string().required(),
      kana: yup.string().required(),
    }).required(),
  }),
  birthDate: yup.string().required().matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
  gender: yup.string().required().matches(/^(male|female)$/),
  phoneNumber: yup.string().required().matches(/^[0-9]{10,11}$/),
  email: yup.string().required().email(),
  nearestStation: yup.string().required(),
})

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<HttpResponse> {
  const data = req.body
  
  if (!data.staffs || !Array.isArray(data.staffs)) {
    return {
      status: 400,
      body: JSON.stringify({error: "Request json must contain 'staffs' field as an array."}),
      headers: {
        "Content-Type": "application/json"
      }
    }
  }
  
  // set up the cosmos client
  const container = cosmosClient
    .database("sk")
    .container("registeredStaffsBasicData")
  
  const staffs = data.staffs
  const result: string[][] = []
  for (const staff of staffs) {
    try {
      const validated = await staffSchema.validate(staff, {stripUnknown: true,})
      
      // check if the staff data is already created
      const querySpec: SqlQuerySpec = {
        query: "select * from c where c.registrationNumber = @registrationNumber",
        parameters: [
          {
            name: "@registrationNumber",
            value: validated.registrationNumber
          }
        ]
      }
      const {resources} = await container.items.query(querySpec).fetchAll()
      if (resources.length > 0) {
        result.push([validated.registrationNumber, "skipped", "already created"])
        continue
      }
      
      await container.items.create({
        ...validated,
        lineUserId: null,
      })
      result.push([validated.registrationNumber, "created", ""])
    } catch (e) {
      result.push(["unknown", "skipped", "validation failed"])
    }
  }
  
  return {
    status: 200,
    body: JSON.stringify({result}),
    headers: {
      "Content-Type": "application/json"
    }
  }
}

export default httpTrigger