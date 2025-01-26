const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const {loging, registration} = require('./controller/user')

const app = express();
app.use(cors())
app.use(express.json())

// moggose is contect
mongoose
.connect('mongodb://127.0.0.1:27017/Authentication')
.then(console.log("Contect the mongosse..."))

app.get("/",(req,res)=>{
    res.json("Runing the api..")
})
app.post("/registration",registration)
app.post('/loging',loging)



app.listen(4001,()=>{
    console.log('api is up...')
})