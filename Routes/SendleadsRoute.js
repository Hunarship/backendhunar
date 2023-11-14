import express from "express"
import { getSentLead, getSentLeadByName, sentLead } from "../Controllers/sentController.js"

const sendLeadRouter = express.Router()

sendLeadRouter.route("/sendlead").post(sentLead)

sendLeadRouter.route("/getsendlead").get(getSentLead)

sendLeadRouter.route("/getsendlead/:sendto").get(getSentLeadByName)

export default sendLeadRouter