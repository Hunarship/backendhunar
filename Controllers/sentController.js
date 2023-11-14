import connectDb from "../connectDb.js";

const sentLead = async(req, res) => {
    try{
        const {
            id,
            name,
            phone,
            service,
            leadtype,
            sendto,
            city
        } = req.body

        const con = await connectDb();

        con.query("INSERT INTO sentleads (id,name,phone,service,leadtype,sendto,city) VALUES (?,?,?,?,?,?,?)", [
            id,
            name,
            phone,
            service,
            leadtype,
            sendto,
            city
        ], (err, result) => {
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

const getSentLead = async(req, res) => {
    const con = await connectDb()

    const data = con.query("SELECT * FROM sentleads", (err, data) => {
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

const getSentLeadByName = async(req, res) => {
  try{
    const { sendto } = req.body
    const con = await connectDb();
    const query = "SELECT * FROM sentleads WHERE sendto = ?";

    con.query(query, [sendto], (err, data) => {
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


export { sentLead, getSentLead, getSentLeadByName }