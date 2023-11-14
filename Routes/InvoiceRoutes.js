import express from "express"
import { createInvoice, getCompletedInvoice } from "../Controllers/invoiceController.js"


const invoiceRoute = express.Router()

invoiceRoute.route("/generateinvoice").post(createInvoice)

invoiceRoute.route("/getallinvoice").get(getCompletedInvoice)


export default invoiceRoute