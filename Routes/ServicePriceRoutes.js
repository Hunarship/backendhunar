import express from "express"
import { createServices, getAllServices, getDistinctValues, searchServices, updateServices } from "../Controllers/servicePriceController.js"

const servicePrice = express.Router()

servicePrice.route("/getallServicesData").get(getAllServices)

servicePrice.route("/createservices").post(createServices)

servicePrice.route("/updateservices").put(updateServices)

servicePrice.route("/getservice/:packagename").get(searchServices)

servicePrice.route("/distinctvalue").get(getDistinctValues)

export default servicePrice