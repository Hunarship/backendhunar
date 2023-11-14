import express from "express"
import { createMainInvoice, deleteInvoice, getAllNonRecurringData, getAllRecurringData, getCreatedInvoice, getInvoiceByName, getNonRecurringData, getRecurringData, updatePaymentStatus } from "../Controllers/invoiceCreateController.js"

const invoiceCreate = express.Router()

invoiceCreate.route("/createmaininvoice").post(createMainInvoice) //creating data

invoiceCreate.route("/getmaininvoice").get(getCreatedInvoice) //getting all data

invoiceCreate.route("/updateinvoice").put(updatePaymentStatus) //updating status data

invoiceCreate.route("/deleteinvoice/:id").delete(deleteInvoice) //deleting particular data

invoiceCreate.route("/getmaininvoice/:createdby").get(getInvoiceByName)

invoiceCreate.route("/getrecurringinvoice/:createdby").get(getRecurringData)

invoiceCreate.route("/getnonrecurringinvoice/:createdby").get(getNonRecurringData)

invoiceCreate.route("/getrecurringinvoice").get(getAllRecurringData)

invoiceCreate.route("/getnonrecurringinvoice").get(getAllNonRecurringData)


export default invoiceCreate
