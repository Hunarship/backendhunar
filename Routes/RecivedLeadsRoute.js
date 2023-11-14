import express from "express"
import { createRecivedLeads, getAllData, getRevDataByName } from "../Controllers/recivedLeads.js"

//EXPRESS ROUTER FOR ROUTING

const recievedLeadRouter = express.Router()


//ROUTES FOR ROUTING
recievedLeadRouter.route("/createrecived").post(createRecivedLeads)

recievedLeadRouter.route("/getRevlead/:createdfor").get(getRevDataByName) //Endpoint for searching data by name

recievedLeadRouter.route("/getRevlead").get(getAllData) //Endpoint for getting all data

export default recievedLeadRouter