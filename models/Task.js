const mongoose=require('mongoose')

const TaskSchema=new mongoose.Schema({
    taskName:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    goal:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Goal',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})