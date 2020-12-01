const express=require('express')
const router=express.Router()
const { ensureAuth }=require('../middleware/auth')
const { showGoalPage,
         addGoal } =require('../controllers/GoalController')
const Goal=require('../models/Goal')

//@parentroute /goals

//@desc Show add goal page
//@route GET/goals/add
//@access Private
router.get('/add',ensureAuth,showGoalPage )

//@desc Process add goal
//@route POST/goals/add
//@access Private
router.post('/add',ensureAuth,addGoal )


module.exports=router;

