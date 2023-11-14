import connectDb from "../connectDb.js";

const createDiscount = async(req, res) => {
    try{
       const {
        months,
        priceinpercentage,
        increaseinmonths,
        servicename
       } = req.body

       const con = await connectDb();
       con.query("INSERT INTO discount (months,priceinpercentage,increaseinmonths,servicename) VALUES (?,?,?,?)",[
        months,
        priceinpercentage,
        increaseinmonths,
        servicename
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
        })
    }
}


const getDiscount = async(req, res) => {
    const con = await connectDb()
    const data = con.query("SELECT * FROM discount", (err,data) => {
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

const getDiscountByService = async(req, res) => {
    try {
        const { servicename } = req.params; 
        const con = await connectDb();
        const query = "SELECT * FROM discount WHERE servicename = ?";
        
        con.query(query, [servicename], (err, data) => {
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

export { createDiscount, getDiscount, getDiscountByService }