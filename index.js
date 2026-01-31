import express from "express"
import  dotenv from "dotenv"
import mongoose from "mongoose"
import prospects from "./Routes/Prospectroute.js"
import cors from "cors"

dotenv.config()
const server=express()
server.use(express.json())

server.use(cors())
 server.use("/prospects",prospects)


const startServer=async()=>{
  try{
    await mongoose.connect(process.env.mongo_uri)
    server.listen(process.env.PORT,()=>{
      console.log(`server is listening on port ${process.env.PORT}`)
    })
    
  }catch(err){
    console.log(err.message)
  }
}

startServer()