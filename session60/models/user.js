const mongoose = require('mongoose')
const role = require('./role')
    const UserSchema = new mongoose.Schema({
        
        userName:{
            type:String
        },
        coins:{
            type:Number,
            default:0
        },
        role:{
          type:mongoose.Schema.Types.ObjectId,
           ref:"role"
        },
    roles:[RoleSchema]
    })
    
    module.exports = mongoose.model("Users",UserSchema)