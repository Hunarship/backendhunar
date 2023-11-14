import connectDb from "../connectDb.js";

const createMainInvoice = async(req, res) => {
    try{
        const {
            id,
            billto,
            date,
            mobile,
            address,
            gstin,
            service,
            packageprice,
            description,
            packagename,
            months,
            amount,
            createdby,
            paymentstatus,
            recurring
        } = req.body

        const con = await connectDb();

        con.query("INSERT INTO createinovice (id,billto,date,mobile,address,gstin,service,packageprice,description,packagename,months,amount,createdby,paymentstatus,recurring) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            id,
            billto,
            date,
            mobile,
            address,
            gstin,
            service,
            packageprice,
            description,
            packagename,
            months,
            amount,
            createdby,
            paymentstatus,
            recurring
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
                status: 1,
              })
            }
          })
    }
    catch(err){
        console.error("Error:", err);
        res.status(500).send({
          message: "Internal Server Error",
          status: 0,
        });
    }
}

//function for deleting the data
const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you pass the ID in the URL params

    const con = await connectDb();

    con.query(
      "DELETE FROM createinovice WHERE id = ?",
      [id],
      (err, result) => {
        if (err) {
          console.error("Error deleting data:", err);
          res.status(500).send({
            message: "Error deleting data",
            status: 0,
          });
        } else if (result.affectedRows === 0) {
          console.log("No invoice found with that ID");
          res.status(404).send({
            message: "No invoice found with that ID",
            status: 0,
          });
        } else {
          console.log("Data Deleted Successfully");
          res.status(200).send({
            message: "Data Deleted Successfully",
            status: 1,
          });
        }
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({
      message: "Internal Server Error",
      status: 0,
    });
  }
};


//updating salespartner status
const updatePaymentStatus = async (req, res) => {
  try {
    const { id, paymentstatus } = req.body; // Assuming you receive the 'id' and the new 'paymentstatus' in the request body

    const con = await connectDb();

    con.query(
      "UPDATE createinovice SET paymentstatus = ? WHERE id = ?",
      [paymentstatus, id],
      (err, result) => {
        if (err) {
          console.error("Error updating payment status:", err);
          res.status(500).send({
            message: "Error updating payment status",
            status: 0,
          });
        } else {
          console.log("Payment status updated successfully");
          res.status(200).send({
            message: "Payment status updated successfully",
            status: 1,
          });
        }
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({
      message: "Internal Server Error",
      status: 0,
    });
  }
};


const getCreatedInvoice = async(req, res) => {
    const con = await connectDb()

    const data = con.query("SELECT * FROM createinovice", (err, data) => {
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

const getInvoiceByName = async(req, res) => {
  try{
   
  const con = await connectDb()

  const query = "SELECT * FROM createinovice"

  con.query(query,(err, data) => {
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
  }
  catch(err){
    console.error("Error:", err);
    res.status(500).send({
      message: "Internal Server Error",
      status: 0,
    });
  }
}

const getRecurringData = async(req, res) => {
  try{
    const con = await connectDb();
    const { createdby } = req.params;

    const query = "SELECT * FROM createinovice WHERE createdby = ? AND recurring = 1";
    con.query(query, [createdby], (err, data) => {
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
}

const getAllRecurringData = async(req, res) => {
  const con = await connectDb()
    const data = con.query("SELECT * FROM createinovice WHERE recurring = 1", (err,data) => {
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

const getAllNonRecurringData = async(req, res) => {
  const con = await connectDb()
    const data = con.query("SELECT * FROM createinovice WHERE recurring = 0", (err,data) => {
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

const getNonRecurringData = async(req, res) => {
  try{
    const con = await connectDb();
    const { createdby } = req.params;

    const query = "SELECT * FROM createinovice WHERE createdby = ? AND  recurring = 0 ";
    con.query(query, [createdby], (err, data) => {
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
}


export { createMainInvoice, getCreatedInvoice, getInvoiceByName, getRecurringData, getNonRecurringData, getAllRecurringData, getAllNonRecurringData, updatePaymentStatus, deleteInvoice }