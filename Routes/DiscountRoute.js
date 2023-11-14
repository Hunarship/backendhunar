import express from "express"
import { createDiscount, getDiscount, getDiscountByService } from "../Controllers/discountController.js"

const discountRoutes = express.Router()

discountRoutes.route("/creatediscount").post(createDiscount)

discountRoutes.route("/getdiscount").get(getDiscount)

discountRoutes.route("/getdiscount/:servicename").get(getDiscountByService)

export default discountRoutes