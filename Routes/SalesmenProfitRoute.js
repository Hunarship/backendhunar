import express from "express"
import { salesmenProfit, getSalesmenProfitByName } from "../Controllers/salesmenProfit.js"

const salespartnerProfit = express.Router()

salespartnerProfit.route("/createprofit").post(salesmenProfit)

salespartnerProfit.route("/getprofit/:salespartnername").get(getSalesmenProfitByName)


export default salespartnerProfit