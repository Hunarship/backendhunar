import connectDb from "../connectDb.js";

const createInvoice = async(req, res) => {
    try{
        const {
            id,
            invoicenumber,
            inovicedate,
            duedate,
            ifsc,
            bankaccount,
            billingaddress,
            description,
            unitprice,
            tax,
            amount,
            paymentstatus,
            createdfor
        } = req.body

        const con = await connectDb();

        con.query("INSERT INTO generateinvoice (id,invoicenumber,inovicedate,duedate,ifsc,bankaccount,billingaddress,description,unitprice,tax,amount,paymentstatus,createdfor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            id,
            invoicenumber,
            inovicedate,
            duedate,
            ifsc,
            bankaccount,
            billingaddress,
            description,
            unitprice,
            tax,
            amount,
            paymentstatus,
            createdfor
        ],
        (err, result) => {
            if (err) {
              console.error("Error inserting data:", err);
              res.status(500).send({
                message: "Error creating data",
                status: 0,
              })
            } else {
              console.log("Data Created Successfully");
              res.status(200).send({
                message: "Data Created Successfully",
                status: 1,z
              })
            }
          })
        
    }
    catch(err){
        console.error("Error:", err);
        res.status(500).send({
          message: "Internal Server Error",
          status: 0,
        })
    }
}

const getAllInvoice = async(req, res) => {
    const con = await connectDb()
    const data = con.query("SELECT * FROM generateinvoice", (err,data) => {
        if(err){
            res.status(500).send({
              message:"Internal Server Error",
              status:0
            })
          }
          else{
            res.status(200).send({
              message:data,
              status:1
            })
          }
    })
}

const getCompletedInvoice = async (req, res) => {
    try {
      const { paymentstatus } = req.body;
      const con = await connectDb();
      const query = `SELECT * FROM generateinvoice WHERE paymentstatus = 'completed'`;
  
      con.query(query, (err, data) => {
        if (err) {
          res.status(500).send({
            message: "Internal Server Error",
            status: 0,
          });
        } else {
          res.status(200).send({
            message: data,
            status: 1,
          });
        }
      });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send({
        message: "Internal Server Error",
        status: 0,
      });
    }
  };
  


export { createInvoice,getAllInvoice,getCompletedInvoice }