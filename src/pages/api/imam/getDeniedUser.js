import { sql } from "@vercel/postgres";
import axios from "axios";

const dotenv = require("dotenv");
dotenv.config();

export default async function VerifiedUserGET(req, res) {
  try {
    //Get email from body
    const email1 = req.body;

    //Check if email is valid
    if (!email1 || email1 === "") {
      return res.status(400).json({ error: "Email is required" });
    }

    //Check if email is already in use
    try {
      const imamMosque = await sql`
      SELECT type
      FROM mosques
      WHERE email = ${email1};
    `;

      const checkEmail4 = await sql`
    SELECT createAcc.*
    FROM createAcc
    LEFT JOIN verify ON createAcc.email = verify.user_email
    LEFT JOIN mosques ON createAcc.email = mosques.email
    WHERE createAcc.gender = 'male'
      AND verify.imam_email = ${email1}
      AND verify.verification = 'Denied'
      AND mosques.type = ANY (${imamMosque.rows.map((imam) => imam.type)});
    `;

      //Removes duplicates based on email
      const uniqueFilteredUsers = Array.from(
        new Set(checkEmail4.rows.map((user) => user.email))
      ).map((email) => checkEmail4.rows.find((user) => user.email === email));

      res.json({ data: uniqueFilteredUsers });

      if (checkEmail4.rows.length === 0) {
        return res.status(400).json({ error: "Email is not verified" });
      }
    } catch (error) {
      console.log("Error while inserting into verify table", error);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error on imam/verifyEmail" });
  }
}
