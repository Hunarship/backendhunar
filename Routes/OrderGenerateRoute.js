import express from "express"

import {  createOrder, getOrder, getOrderByName, getSubscribedUser, getSubscribedUserSalesmen } from "../Controllers/orderController.js"
  

//EXPRESS ROUTER FOR ROUTING
const generateOrder = express.Router()

//ROUTES FOR ROUTING

generateOrder.route("/createinvoice").post(createOrder)  //api for creating 

generateOrder.route("/getinvoice/:createdby").get(getOrderByName) //Endpoint for searching data by name

generateOrder.route("/getsubscribed").get(getSubscribedUser) //Endpoint for getting of subscribed user

generateOrder.route("/getsubscribed/:createdby").get(getSubscribedUserSalesmen) //Endpoint for getting of subscribed user created by client

generateOrder.route("/getinvoice").get(getOrder) //api for admin

export default generateOrder

