import express from "express"
import { createData, getData, loginUser, verifyjwt } from "../Controllers/salesmenController.js"


//EXPRESS ROUTER FOR ROUTING
const salesRouter = express.Router()


salesRouter.route("/salesmensignup").post(createData) //Endpoint for creating data

salesRouter.route("/salesmendata").get(getData) //Endpoint For Admin

salesRouter.route("/salesmenlogin").post(loginUser) //Endpoint FOR LOGIN



salesRouter.route("/checkauth").get(verifyjwt, (req, res) => {
    return res.json("Authenticated");
  });


export default salesRouter
