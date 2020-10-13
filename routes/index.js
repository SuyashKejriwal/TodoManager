const { Router } = require('express')
const express=require('express')
const router=express.Router()
const { ensureAuthenticated }=require('../middleware/auth')

//@parentroute /

//@desc Show landing page
//@route GET
router.get('/',(req, res,next) => {
  res.render('home',{
    layout: 'layouts/main',
     title: 'Todo Manager',
       css: 'css/home.css'
  });
})

router.get('/dashboard',(req,res,next)=>{
  res.render('listmenu',{
    title: 'Todo Manager - Dashboard',
    css:'css/register.css'
  })
})
module.exports=router;