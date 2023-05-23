require('dotenv').config()

const express= require('express')

const cors= require('cors')
const router = require('./routes/router')

const server= express()

require('./db/connection')

const PORT= process.env.PORT || 4000

server.use(cors())

server.use(express.json())

server.use("/uploads",express.static("./uploads"))

server.use(router)

server.listen(PORT,()=>{
    console.log(`Server is listening in ${PORT}`);
})




server.get('/',(req,res)=>{
    res.send("ems server started")
})






