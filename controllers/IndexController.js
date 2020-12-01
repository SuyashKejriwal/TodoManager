
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

//@desc Show Dashboard Page
//@route GET/dashboard
//@access Private
const showDashboardPage=(req,res)=>{
  
  console.log(req.user);
   
  res.render('screens/DashboardPage',{
    layout: 'layouts/main',
    title: 'Todo Manager - Dashboard',
    css:'css/dashboard.css',
    name: req.user.name,
  })
 
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