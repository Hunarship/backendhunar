import express from "express"
import { getCommissionForParticularSalespartner, getCommissionForParticularService, setCommissionForParticularSalespartner, updateCommissionForSalespartner } from "../Controllers/serviceController.js"

const serviceRoute = express.Router()

serviceRoute.route("/setcommission").post(setCommissionForParticularSalespartner)

serviceRoute.route("/updatecommission").put(updateCommissionForSalespartner)

serviceRoute.route("/getcommission").get(getCommissionForParticularSalespartner)


serviceRoute.route("/getcommission/:salespartnername").get(getCommissionForParticularService)

export default serviceRoute