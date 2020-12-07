const express=require('express')
const router=express.Router()
const { ensureAuth }=require('../middleware/auth')
const {
   addTask
}=require('../controllers/TaskController')


//@desc Add Task in database
//@route POST/tasks/add
//@access Private
router.post('/tasks/add',ensureAuth,addTask)

module.exports=router;