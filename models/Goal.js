const mongoose=require('mongoose')

const GoalSchema=new mongoose.Schema({
    goalName:{
        type: String,
        required: true
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    user:{
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