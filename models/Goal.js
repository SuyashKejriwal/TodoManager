const mongoose=require('mongoose')

const GoalSchema=new mongoose.Schema({
    Goalname:{
        type: String,
        required: true
    },
    Startdate:{
        type:String,
        required:true,
    },
    Enddate:{
        type:String,
        required:true,
    },
    User:{
        type:String,
        ref:User,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})
const User=mongoose.model('User',UserSchema)
module.exports=User;