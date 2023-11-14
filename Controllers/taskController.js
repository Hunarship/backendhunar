import connectDb from "../connectDb.js";

const createTask = async(req, res) => {
    try{
        const {
            id,
            task,
            work,
            completedon,
            startdate,
            duedate,
            assignedto,
            status
        } = req.body

        const con = await connectDb();

        con.query("INSERT INTO taksmanagement (id,task,work,completedon,startdate,duedate,assignedto,status) VALUES (?,?,?,?,?,?,?,?)", [
            id,
            task,
            work,
            completedon,
            startdate,
            duedate,
            assignedto,
            status
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

//function for updating task acc to status
const updateTaskStatus = async (req, res) => {
  try {
      const { id, status } = req.body;
      const con = await connectDb();

      con.query(
          "UPDATE taksmanagement SET status = ? WHERE id = ?",
          [status, id],
          (err, result) => {
              if (err) {
                  console.error("Error updating data:", err);
                  res.status(500).send({
                      message: "Error updating data",
                      status: 0,
                  });
              } else {
                  if (result.affectedRows === 0) {
                      res.status(404).send({
                          message: "Task not found",
                          status: 0,
                      });
                  } else {
                      console.log("Data Updated Successfully");
                      res.status(200).send({
                          message: "Data Updated Successfully",
                          status: 1,
                      });
                  }
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


const getAllTask = async(req, res) => {
    const con = await connectDb()

    const data = con.query("SELECT * FROM taksmanagement", (err, data) => {
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


const getTaskByName = async (req, res) => {
  try {
    const assignedto = req.params.assignedto; // Access the assignedto parameter from the route

    const con = await connectDb();
    const query = "SELECT * FROM taksmanagement WHERE assignedto = ?";

    con.query(query, [assignedto], (err, data) => {
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


export { createTask, getTaskByName, getAllTask, updateTaskStatus }