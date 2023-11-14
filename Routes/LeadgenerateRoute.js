import express from "express"
import { createlead, deleteLead, getDataByName, getlead } from "../Controllers/leadsController.js"

//EXPRESS ROUTER FOR ROUTING

const leadRouter = express.Router()


//ROUTES FOR ROUTING

leadRouter.route("/generatelead").post(createlead) //Endpoint for creating

leadRouter.route("/getlead").get(getlead) //Admin endpoint for getting data

leadRouter.route("/deletelead").delete(deleteLead) //Endpoint for Admin

leadRouter.route("/getlead/:createdby").get(getDataByName) //Endpoint for searching data by name

export default leadRouter