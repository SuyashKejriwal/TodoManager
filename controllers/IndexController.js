const Goal=require('../models/Goal');
const Task = require('../models/Task');
//@desc Show Home Page
//@route GET/
//@access Public
const showHomePage=(req, res,next) => {
    // res.send('hello');
     res.render('screens/HomePage',{
       layout: 'layouts/main',
        title: 'Todo Manager',
          css: 'css/home.css'
     });
   }

//@desc Show Dashboard Page with all goals
//@route GET/dashboard
//@access Private
const showDashboardPage=async (req,res)=>{
  try {
    console.log(req.user);
    const goals=await Goal.find({user:req.user.id}).lean() ;

    res.render('screens/DashboardPage',{
      layout: 'layouts/main',
      title: 'Todo Manager - Dashboard',
      css:'css/dashboard.css',
      name: req.user.name,
      goals: goals,
      helper: require('../helpers/ejshelper'),
    })
  } catch (error) {
    
  }
 
  }

//@desc Show calendar page
//@route GET/calendar
//@access Private 
const showCalendarPage=(req,res)=>{
  
  console.log(req.user);
   
  res.render('screens/CalendarPage',{
    layout: 'layouts/special',
    title: 'Todo Manager - Calendar',
    css:'css/calendar.css',
    js: 'js/calendar.js',
    name: req.user.name,
    helper: require('../helpers/ejshelper'),
  })
 
  }

//@desc Show calendar page
//@route GET/calendar
//@access Private 
const showReportPage=async (req,res)=>{
  try{
    console.log(req.user);
    const goals=await Goal.find({user:req.user.id}).lean() ;

    //console.log(goals);
    
  res.render('screens/ReportPage',{
    layout: 'layouts/main',
    title: 'Todo Manager - Report',
    css:'css/report.css',
    goals,
    name: req.user.name,
    helper: require('../helpers/ejshelper'),
  })
 
  }catch(err){

  }
  
}

//@desc Go to home page on clicking home icon
//@route GET/home
//@access Private 
const homeIcon=(req,res,next) => {
  // first it will logout and then redirect to home page
  req.logout();
  res.redirect('/')
}

//@desc Go to List menu page
//@route GET/listmenu
//@access Private
const showListMenuPage=async (req,res) => {
  try {
    //console.log(req.user);
    const goals=await Goal.find({user:req.user.id}).lean() ;
    //console.log(goals);

    const activeGoals=new Array();
     
    var today = new Date();
    // run a for each loop and check if the goal is active.
    goals.forEach(function(goal){

      var startdate=new Date(goal.startDate);
      var enddate=new Date(goal.endDate);
     // console.log(startdate);
      if ((today.getTime() > startdate.getTime())&&(enddate.getTime()> today.getTime())) {
        activeGoals.push(goal);
      }
    });

   // console.log(activeGoals);

    res.render('screens/ListMenuPage',{
      layout: 'layouts/main',
      title: 'Todo Manager - List Menu',
      css:'css/dashboard.css',
      name: req.user.name,
      goals: activeGoals,
      helper: require('../helpers/ejshelper'),
    })
  } catch (error) {
    
  }
}

//@desc Go to task Dashboard page
//@route GET/taskDashboard
//@access Private
const showTaskDashboardPage=async (req,res) => {
  try {
    //console.log(req.user);
    const tasks=await Task.find({user:req.user.id}) ;

    res.render('screens/TaskDashboardPage',{
      layout: 'layouts/main',
      title: 'Todo Manager - Task Dashboard',
      css:'css/dashboard.css',
      name: req.user.name,
      tasks: tasks,
      helper: require('../helpers/ejshelper'),
    })
  } catch (error) {
    
  }
}



module.exports={
    showHomePage,
    showDashboardPage,
    showCalendarPage,
    showReportPage,
    homeIcon,
    showListMenuPage,
    showTaskDashboardPage
}