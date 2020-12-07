const Goal=require('../models/Goal')
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
      goals: goals
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
  })
 
  }

module.exports={
    showHomePage,
    showDashboardPage,
    showCalendarPage
}