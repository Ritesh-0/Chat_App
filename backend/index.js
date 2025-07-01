import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {app,server} from './socket/socket.js'
dotenv.config({})
import cookieParser from "cookie-parser"

import connectDb from "./config/database.js"
import userRoute from "./routes/user.routes.js"
import messageRout from "./routes/message.route.js"

const PORT = process.env.PORT || 9090

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());

const corsOption = {
     origin:'http://localhost:5173',
     credentials:true
};
app.use(cors(corsOption))

// routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/message",messageRout)

server.listen(PORT, ()=>{
     connectDb()
     console.log(`server is running at ${PORT}`)
})

