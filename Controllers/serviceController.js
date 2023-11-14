import connectDb from "../connectDb.js";

const setCommissionForParticularSalespartner =  async(req, res) => {
  try{
    const {
      
      commission,
      salespartnername
    } = req.body

    const con = await connectDb();

    con.query("INSERT INTO servicecommission (commission,salespartnername) VALUES (?,?)",[
      
      commission,
      salespartnername
    ],(err, result) => {
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
    })
  }
}

const updateCommissionForSalespartner = async (req, res) => {
  try {
    const {
      commission,
      salespartnername
    } = req.body;

    const con = await connectDb();

    con.query(
      "UPDATE servicecommission SET commission = ? WHERE salespartnername = ?",
      [commission, salespartnername],
      (err, result) => {
        if (err) {
          console.error("Error updating commission:", err);
          res.status(500).send({
            message: "Error updating commission",
            status: 0,
          });
        } else if (result.affectedRows === 0) {
          console.log("No sales partner found with that name");
          res.status(404).send({
            message: "No sales partner found with that name",
            status: 0,
          });
        } else {
          console.log("Commission updated successfully");
          res.status(200).send({
            message: "Commission updated successfully",
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



const getCommissionForParticularSalespartner = async(req, res) => {
  const con = await connectDb()

  const data = con.query("SELECT * FROM servicecommission", (err, data) => {
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

const getCommissionForParticularService = async(req, res) => {
  try{
    const { salespartnername } = req.params;
    const con = await connectDb()

    const query = "SELECT * FROM servicecommission WHERE salespartnername = ?";
    con.query(query, [salespartnername], (err, data) => {
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

  }
}

export  { setCommissionForParticularSalespartner, getCommissionForParticularSalespartner,getCommissionForParticularService, updateCommissionForSalespartner } 