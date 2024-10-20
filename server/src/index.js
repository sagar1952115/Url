const express = require("express");
const connectDB = require("./db/config.js");
const { init } = require("./redis/redisClient.js");
const urlRoutes=require("../routes/urlRoutes.js")
const cors=require("cors")

const dotenv = require("dotenv");
dotenv.config();

connectDB();
init();

const app=express();
app.use(cors())


app.use(express.json());

app.use('/', urlRoutes);

app.listen("5000",()=>{
  console.log("app is listenint at 5000")
})
