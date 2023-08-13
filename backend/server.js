import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
//import from file
import router from "./routes/user.js";
import blogRouter from './routes/blog.js'

const app = express();
app.use(express.json())
app.use(cors())
dotenv.config();

app.use("/", router);
app.use("/api/blogs", blogRouter )

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req , res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}else{
  
}

mongoose.connect('mongodb+srv://Abenezer:abenu%40nati.b@cluster0.p1npdo1.mongodb.net/blog-app?retryWrites=true&w=majority').then(() =>
  app.listen(5000, () => {
    console.log(`connected to db`);
    console.log("listning to port 5000");
  })
).catch((error)=>console.log(`error occured at conneting mongo${error}`))
