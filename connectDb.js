import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    const con = await mysql.createConnection({
      host: process.env.HOST_NAME,
      user: process.env.USER_NAME,
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME,
    });

    con.connect((err) => {
      if (err) {
        console.error("Error connecting to the database:", err);
      } else {
        // console.log(`Connected to the database`);
      }
    });

    return con
  } catch (err) {
    console.error("Error creating database connection:", err);
    throw err
  }
};

export default connectDb
