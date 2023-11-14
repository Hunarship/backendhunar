import connectDb from "../connectDb.js"

const createRecivedLeads = async(req, res) => {
    try{
                const {
                  
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
                createdfor,
                location
                } = req.body

                const serviceString = service.join(', ');

                const con = await connectDb()

                con.query("INSERT INTO recievedlead (leadtype,leadsource,name,phonenumber,email,businessname,businessphonenumber,businessemail,businesswebsite,businesscategory,businesssubcategory,facebookurl,instagramurl,twitterurl,threadsurl,linkedinurl,youtubeurl,otherurl,service,attachment,note,createdfor,location) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
                    
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
                    createdfor,
                    location
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

const getRevDataByName = async (req, res) => {
    try {
      const { createdfor } = req.params; 
      const con = await connectDb();
      const query = "SELECT * FROM recievedlead WHERE createdfor = ?";
      
      con.query(query, [createdfor], (err, data) => {
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

  const getAllData = async(req, res) => {
    const con = await connectDb()
    const data = con.query("SELECT * FROM recievedlead", (err,data) => {
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


  export { getRevDataByName, createRecivedLeads, getAllData }