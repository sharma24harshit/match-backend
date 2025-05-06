const express = require('express');
const cors = require("cors");
const {connection} = require("./db");

 const { DetailsRoute } = require('./Route');

require("dotenv").config()

const app = express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home page of Match app")
})


 app.use("/details", DetailsRoute);





app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("connection error",error)
    }
    console.log("server is running at 5200")
})