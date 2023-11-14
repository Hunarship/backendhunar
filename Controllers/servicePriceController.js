import connectDb from "../connectDb.js";

const createServices = async(req, res) => {
  try{
    const {
      
      silver,
      silverprice,
      silverdescription,
      gold,
      goldprice,
      golddescription,
      platinum,
      platinumprice,
      platinumdescription,
      custom,
      customprice,
      customdescription,
      packagename,
      repeated
    } = req.body

    const con = await connectDb();

    con.query("INSERT INTO serviceprices (silver,silverprice,silverdescription,gold,goldprice,golddescription,platinum,platinumprice,platinumdescription,custom,customprice,customdescription,packagename,repeated) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
      
      silver,
      silverprice,
      silverdescription,
      gold,
      goldprice,
      golddescription,
      platinum,
      platinumprice,
      platinumdescription,
      custom,
      customprice,
      customdescription,
      packagename,
      repeated
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

const getAllServices = async(req, res) => {
  const con = await connectDb()

  const data = con.query("SELECT * FROM serviceprices", (err,data) => {
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

const getDistinctValues = async (req, res) => {
  const con = await connectDb();

  const query = "SELECT DISTINCT packagename FROM serviceprices"; 

  con.query(query, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Internal Server Error",
        status: 0
      });
    } else {
      res.status(200).send({
        message: data,
        status: 1
      });
    }
  });
};

const updateServices = async (req, res) => {
  try {
    const {
      services,
      description,
      silver,
      silverprice,
      gold,
      goldprice,
      platinum,
      platinumprice,
      custom,
      customprice
    } = req.body;

    const con = await connectDb();

    con.query(
      "UPDATE serviceprices SET description = ?, silver = ?, silverprice = ? ,gold = ?, goldprice = ?,platinum = ?, platinumprice = ?,custom = ?, customprice = ?, WHERE services = ?",
      [
        services,
        description,
        silver,
        silverprice,
        gold,
        goldprice,
        platinum,
        platinumprice,
        custom,
        customprice
      ],
      (updateError, result) => {
        if (updateError) {
          console.error("Error updating data:", updateError);
          res.status(500).send({
            message: "Error updating data",
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
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({
      message: "Internal Server Error",
      status: 0,
    });
  }
};


const searchServices = async (req, res) => {
  try {
    const { packagename } = req.params;
    const con = await connectDb();
    const query = 'SELECT * FROM serviceprices WHERE packagename = ?';

    con.query(query, [packagename], (err, data) => {
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

export { createServices, getAllServices, updateServices, searchServices, getDistinctValues}