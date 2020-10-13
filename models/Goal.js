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
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})
const Goal=mongoose.model('Goal',GoalSchema)
module.exports=Goal;