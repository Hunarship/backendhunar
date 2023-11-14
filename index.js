import express from "express"
import dotenv from "dotenv"
import cors from "cors" 
import connectDb from "./connectDb.js"
import salesRouter from "./Routes/SalesmenRoute.js"
import leadRouter from "./Routes/LeadgenerateRoute.js"
import generateOrder from "./Routes/OrderGenerateRoute.js"
import sendLeadRouter from "./Routes/SendleadsRoute.js"
import serviceRoute from "./Routes/ServicesRoute.js"
import invoiceRoute from "./Routes/InvoiceRoutes.js"
import taskRouter from "./Routes/TaskRoutes.js"
import servicePrice from "./Routes/ServicePriceRoutes.js"
import invoiceCreate from "./Routes/InvoiceCreateRoute.js"
import salespartnerProfit from "./Routes/SalesmenProfitRoute.js"
import discountRoutes from "./Routes/DiscountRoute.js"
import recievedLeadRouter from "./Routes/RecivedLeadsRoute.js"



connectDb()

dotenv.config()

const app = express()

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({credentials: true, origin: allowedOrigins}))

app.use(express.json()) 


app.get("/", (req,res) => {
    res.send({
        message:"Api is Working"
    })
})

//ROUTES
app.use("/api",salesRouter)
app.use("/api",leadRouter)
app.use("/api",generateOrder)
app.use("/api", sendLeadRouter)
app.use("/api", serviceRoute)
app.use("/api", invoiceRoute)
app.use("/api", taskRouter)
app.use("/api", servicePrice)
app.use("/api", invoiceCreate)
app.use("/api", salespartnerProfit)
app.use("/api", discountRoutes)
app.use("/api",recievedLeadRouter)

const date = new Date()
console.log(date)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`)
})