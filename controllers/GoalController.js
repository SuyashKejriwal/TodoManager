const Goal=require('../models/Goal')

//@desc Show add goal page
//@route GET/goals/add
//@access Private
const showGoalPage=(req,res)=>{
    console.log(req.user);
      res.render('screens/AddGoalPage',{
          title: 'Todo Manager - Add Goal ',
          css: '/css/goal.css'
        });
}

//@desc Process add goal
//@route POST/goals/add
//@access Private
const addGoal=(req,res)=>{
    console.log(req.user);
    req.body.user=req.user.id
    console.log(req.body.user);
   var { goalName,startDate,endDate,description,user}=req.body;
   let errors=[];
   console.log(req.user);
   // Check required fields
   if(!goalName||!startDate||!endDate){
    errors.push({msg:'Please fill in all the fields'})
    // send details to prepopulate forms
    res.render('screens/AddGoalPage', {
      title: 'Todo Manager - Add Goal ',
      css: '/css/goal.css',
      errors,
      goalName,
      startDate,
      endDate,
      description
  })
   }
   else {
     //Validation passed 
     // create an object for goal
     const newGoal=new Goal({
          goalName,
          startDate,
          endDate,
          description,
          user
     });
     console.log(newGoal);
     // save goal
     newGoal
     .save()
     .then((goal)=>{
       // goal successfully added
        res.redirect('/dashboard');
     })
     .catch((err)=>{
       console.log(err);
     })
   }
  }


module.exports={
    showGoalPage,
    addGoal
}