const { Router } = require('express')
const express=require('express')
const router=express.Router()
const { ensureAuth,
        ensureGuest }=require('../middleware/auth')
const { showHomePage,
       showDashboardPage, 
       showCalendarPage,
       showReportPage,
       showListMenuPage,
       showTaskDashboardPage,
       homeIcon} =require('../controllers/IndexController')
const Goal=require('../models/Goal')
//@parentroute /

//@desc Show Home Page
//@route GET/
//@access Public
router.get('/',ensureGuest,showHomePage)

//@desc Show Dashboard Page
//@route GET/dashboard
//@access Private
router.get('/dashboard',ensureAuth,showDashboardPage)

//@desc Show calendar page
//@route GET/calendar
//@access Private 
router.get('/calendar',ensureAuth, showCalendarPage )

//@desc Show report page
//@route GET/report
//@access Private 
router.get('/report',ensureAuth, showReportPage )

//@desc Go to Home Page on clicking home icon
//@route GET/home
//@access Private 
router.get('/home',ensureAuth, homeIcon )

//@desc Go to List menu page
//@route GET/listmenu
//@access Private
router.get('/listmenu',ensureAuth,showListMenuPage )

//@desc Go to task Dashboard page
//@route GET/taskDashboard
//@access Private
router.get('/taskDashboard',ensureAuth,showTaskDashboardPage );

module.exports=router;