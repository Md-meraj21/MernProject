import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT || 5000;

await connectDb();

app.listen(port, () => {
    console.log(`Server is Started at the port is ${port}`);
});
