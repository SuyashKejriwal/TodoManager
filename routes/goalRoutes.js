const express=require('express')
const router=express.Router()
const { ensureAuth }=require('../middleware/auth')
const { showGoalPage,
         addGoal,
         removeGoal,
         editGoal,
        showSingleGoal } =require('../controllers/GoalController')

//@parentroute /goals

//@desc Show add goal page
//@route GET/goals/add
//@access Private
router.get('/add',ensureAuth,showGoalPage )

//@desc Process add goal
//@route POST/goals/add
//@access Private
router.post('/add',ensureAuth,addGoal )

//@desc Show goal Details page
//@route GET/goal/:id
//@access Private
router.get('/goal/:id',ensureAuth,showSingleGoal)

//@desc Update Goal
//@route PUT goal/:id
//@access Private
router.put('/goal/:id',ensureAuth,editGoal)

//@desc Delete Goal
//@route DELETE goal/:id
//@access Private
router.delete('/goal/:id',ensureAuth,removeGoal)

module.exports=router;

