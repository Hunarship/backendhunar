import multer from "multer"
import connectDb from "../connectDb.js"

//FUNCTION FOR CREATING LEAD

const createlead = async(req,res) => {
    try{
            
            const {
              id,
                leadtype,
                leadsource,
                name,
                phonenumber,
                email,
                businessname,
                businessphonenumber,
                businessemail,
                businesswebsite,
                businesscategory,
                businesssubcategory,
                facebookurl,
                instagramurl,
                twitterurl,
                threadsurl,
                linkedinurl,
                youtubeurl,
                otherurl,
                service,
                attachment,
                note,
                createdby
            } = req.body

            const serviceString = service.join(', ');

            const con = await connectDb()
            
            con.query("INSERT INTO leadgenerate (id,leadtype,leadsource,name,phonenumber,email,businessname,businessphonenumber,businessemail,businesswebsite,businesscategory,businesssubcategory,facebookurl,instagramurl,twitterurl,threadsurl,linkedinurl,youtubeurl,otherurl,service,attachment,note,createdby) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
              id,
              leadtype,
              leadsource,
              name,
              phonenumber,
              email,
              businessname,
              businessphonenumber,
              businessemail,
              businesswebsite,
              businesscategory,
              businesssubcategory,
              facebookurl,
              instagramurl,
              twitterurl,
              threadsurl,
              linkedinurl,
              youtubeurl,
              otherurl,
              serviceString,
              attachment,
              note,
              createdby,
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

//FUNCTION FOR GETTING ALL THE DATA FOR ADMIN

const getlead = async(req,res) => {
    const con = await connectDb()
    const data = con.query("SELECT * FROM leadgenerate", (err,data) => {
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

// FUNCTION FOR GETTING TO INDIVISUAL SALESPERSON

const getDataByName = async (req, res) => {
  try {
    const { createdby } = req.params; 
    const con = await connectDb();
    const query = "SELECT * FROM leadgenerate WHERE createdby = ?";
    
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

const deleteLead = async (req, res) => {
  try {
    const { id } = req.body;
    const con = await connectDb();

    const deleteQuery = "DELETE FROM leadgenerate WHERE id = ?";

    con.query(deleteQuery, [id], (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Internal Server Error",
          status: 0,
        });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).send({
            message: "Data Deleted Successfully",
            status: 1,
          });
        } else {
          res.status(404).send({
            message: "Data not found for the given phone number",
            status: 0,
          });
        }
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



export { getDataByName,getlead,createlead, deleteLead }