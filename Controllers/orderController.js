import connectDb from "../connectDb.js"

const createOrder = async(req,res) => {
    try{
        const {
            id,
            billdate,
            duedate,
            client,
            project,
            tax,
            tds,
            recurring,
            repeatevery,
            duration,
            cycle,
            note,
            createdby,
            status,
            phone
          } = req.body;

          const con = await connectDb();

          con.query(
            "INSERT INTO generateorder (id,billdate,duedate,client,project,tax,tds,recurring,repeatevery,duration,cycle,note,createdby,status,phone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              id,
              billdate,
              duedate,
              client,
              project,
              tax,
              tds,
              recurring,
              repeatevery,
              duration,
              cycle,
              note,
              createdby,
              status,
              phone
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
              }
            )
    }
    catch(err){
        console.error("Error:", err);
        res.status(500).send({
          message: "Internal Server Error",
          status: 0,
        })
    }
   
}

//Function for getting data
const getOrder = async(req,res) => {
    const con = await connectDb()
    const data = con.query("SELECT * FROM generateorder", (err,data) => {
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

//get invoice by name
const getOrderByName = async (req, res) => {
  try {
    const { createdby } = req.params; 
    const con = await connectDb();
    const query = "SELECT * FROM generateorder WHERE createdby = ?";
    
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

const getSubscribedUser = async(req, res) => {
  
  const con = await connectDb()
  
  const data = con.query("SELECT * FROM generateorder WHERE recurring = 1", (err,data) => {
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

const getSubscribedUserSalesmen = async (req, res) => {
  try {
    const con = await connectDb();
    const { createdby } = req.params;

    const query = "SELECT * FROM generateorder WHERE createdby = ? AND recurring = 1";
    const data = await con.query(query, [createdby]);

    res.status(200).send({
      message: data,
      status: 1
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({
      message: "Internal Server Error",
      status: 0
    });
  }
}



export { createOrder, getOrder, getOrderByName, getSubscribedUser,getSubscribedUserSalesmen }