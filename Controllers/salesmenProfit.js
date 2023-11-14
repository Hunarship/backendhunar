import connectDb from "../connectDb.js";

const salesmenProfit = async(req, res) => {
    try{
        const {
            salespartnername,
            commission,
            servicename
        } = req.body
        const con = await connectDb();

        con.query("INSERT INTO salespartnerprofit (salespartnername,commission,servicename) VALUES (?,?,?)",[
          salespartnername,
            commission,
            servicename
        ],  (err, result) => {
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

const getSalesmenProfitByName = async(req, res) => {
  try{
    const { salespartnername } = req.params; 
  const con = await connectDb()

  const query = "SELECT * FROM salespartnerprofit WHERE salespartnername = ?"

  con.query(query,[salespartnername], (err, data) => {
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

export { salesmenProfit, getSalesmenProfitByName }