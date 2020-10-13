const express=require('express')
const router=express.Router()

const Goal=require('../models/Goal')

//@parentroute /goals

//@desc Show add goal page
//@route GET/add
router.get('/add',(req,res,next)=>{
    res.render('goals/add',{
        title: 'Todo Manager - Add Goal ',
        css: '/css/goal.css'
      });
})

//@desc Process add goal
//@route POST/add
router.post('/add',(req,res,next)=>{

})
module.exports=router;