const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userModel = mongoose.Schema({
    uname : {type : String,
         required : true,
         unique : true
        },
    email : {type : String, required : true},
    password : {type : String, required : true}

})

module.exports = mongoose.model('Users',userModel)