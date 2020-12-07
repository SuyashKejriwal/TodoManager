const Task=require('../models/Task')

//@desc Add Task in database
//@route POST/tasks/add
//@access Private
const addTask=async(req,res)=> {
 const { taskName, description , goal }=req.body


}

module.exports={
    addTask
}