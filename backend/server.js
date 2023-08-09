import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
//import from file
import router from "./routes/user.js";
import blogRouter from './routes/blog.js'

const app = express();
app.use(express.json())
dotenv.config();

app.use("/", router);
app.use("/api/blogs", blogRouter )

mongoose.connect(process.env.MONGO_URI).then(() =>
  app.listen(5000, () => {
    console.log(`connected to db`);
    console.log("listning to port 5000");
  })
).catch((error)=>console.log(`error occured at conneting mongo${error}`))
