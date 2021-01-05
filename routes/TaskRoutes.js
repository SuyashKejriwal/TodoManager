const express=require('express')
const router=express.Router()
const { ensureAuth }=require('../middleware/auth')
const {
   showAddTaskPage,
   addTask,
   showEditTaskPage,
   editTask,
   showEditTaskProgressPage,
   removeTask
}=require('../controllers/TaskController')

//@desc Show add task page
//@route GET /tasks/add/goal/:id
//@access Private
router.get('/add/goal/:id',ensureAuth,showAddTaskPage);

//@desc Add Task in database
//@route POST/tasks/add
//@access Private
router.post('/add',ensureAuth,addTask)

//@desc delete task
//@route DELETE task/:id
//@access Private
router.delete('/:id/goal/:goalId',ensureAuth,removeTask)

//@desc Show Edit Task Page
//@route GET tasks/edit/:id
//@access Private
router.get('/edit/:id',ensureAuth,showEditTaskPage)

//@desc edit task
//@route PUT tasks/:id
//@access Private
router.put('/:id',ensureAuth,editTask)

//@desc Show edit task progress page
//@route GET tasks/editProgress/:id
//@access Private
router.get('/editProgress/:id',ensureAuth,showEditTaskProgressPage)

module.exports=router;