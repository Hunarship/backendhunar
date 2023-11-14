import connectDb from "../connectDb.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createData = async (req, res) => {
  try {
    const {
      id,
      name,
      number,
      email,
      username,
      password,
      country,
      state,
      district,
    } = req.body;

    const con = await connectDb();

    const existingUser = await new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM salesmendata WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        }
      );
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        status: 0,
      });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    con.query(
      "INSERT INTO salesmendata (id, name, number, email, username, password, country, state, district) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        name,
        number,
        email,
        username,
        password,
        country,
        state,
        district,
      ],
      async (err) => {
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).send({
            message: "Error creating data",
            status: 0,
          });
        } else {
          // Query the user data after insertion
          const userData = await new Promise((resolve, reject) => {
            con.query(
              "SELECT * FROM salesmendata WHERE id = ?",
              [id],
              (err, result) => {
                if (err) {
                  console.error("Error retrieving user data:", err);
                  reject(err);
                } else {
                  resolve(result[0]);
                }
              }
            );
          });


          res.status(200).send({
            message: "Data Created Successfully",
            status: 1,
            user: userData,
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

// FUNCTION GETTING ALL SALESMEN DATA FOR ADMIN
const getData = async (req, res) => {
  try {
    const con = await connectDb();
    const data = await new Promise((resolve, reject) => {
      con.query("SELECT * FROM salesmendata", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.status(200).send({
      message: data,
      status: 1,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({
      message: "Internal Server Error",
      status: 0,
    });
  }
};

//Function for chechking auth
const verifyjwt = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.status(401).json("Token not provided");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).json("Not authenticated");
      } else {
        req.userID = decode.id;
        next();
      }
    });
  }
};


function generateAccessToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Access token expires in 1 hour
  });
}

// Function to generate a refresh token
function generateRefreshToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Refresh token expires in 7 days
  });
}

// FUNCTION FOR USER LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const con = await connectDb();

    const existingUser = await new Promise((resolve, reject) => {
      con.query('SELECT * FROM salesmendata WHERE email = ?', [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });

    if (!existingUser) {
      return res.status(404).json({
        message: 'User not found',
        status: 0,
      });
    }

    // Validate the user's password
    // const matchPassword = bcrypt.compareSync(password, existingUser.password);

    // if (!matchPassword) {
    //   return res.status(400).json({
    //     message: 'Invalid Credentials',
    //     status: 0,
    //   });
    // }

    // Generate an access token and a refresh token
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);

    // Set the access token as an HttpOnly cookie
    res.cookie('access_token', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 }); 

    // Set the refresh token as an HttpOnly cookie
    res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }); 

    res.status(200).send({
      message: 'Authentication successful',
      status: 1,
      user: existingUser,
      token: accessToken,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send({
      message: 'Internal Server Error',
      status: 0,
    });
  }
};

const updateSalesmenData = async (req, res) => {
  try {
    const { username, id } = req.body; 

    const con = await connectDb();

    // Check if the user is authenticated
    if (!req.userID) {
      return res.status(401).json({
        message: 'Not authenticated',
        status: 0,
      });
    }

    // Update the user data in the database
    con.query(
      'UPDATE salesmendata SET username = ? WHERE id = ?',
      [username, id],
      async (err, result) => {
        if (err) {
          console.error('Error updating user data:', err);
          res.status(500).send({
            message: 'Error updating data',
            status: 0,
          });
        } else {
          // Query the updated user data
          const updatedUserData = await new Promise((resolve, reject) => {
            con.query('SELECT * FROM salesmendata WHERE id = ?', [id], (err, result) => {
              if (err) {
                console.error('Error retrieving updated user data:', err);
                reject(err);
              } else {
                resolve(result[0]);
              }
            });
          });

          res.status(200).send({
            message: 'Data updated successfully',
            status: 1,
            user: updatedUserData,
          });
        }
      }
    );
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send({
      message: 'Internal Server Error',
      status: 0,
    });
  }
};



export { loginUser, createData, getData, verifyjwt };
