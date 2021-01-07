const Goal=require('../models/Goal');
const Task=require('../models/Task');

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

//@desc  add goal
//@route POST/goals/add
//@access Private
const addGoal=(req,res)=>{
    req.body.user=req.user.id
   // console.log(req.body.user);
   var { goalName,description,user}=req.body;
   // calculation of total days
const startDate=new Date(req.body.startDate);

const endDate=new Date(req.body.endDate);
   
let errors=[];
var today=new Date();
console.log(today);
var time_in_day=(today.getTime()-startDate.getTime())/(1000*3600*24);
console.log(time_in_day);
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
   else if(startDate.getTime()>endDate.getTime()){
    errors.push({msg:'Start Date must be before End Date'})
    // send details to prepopulate form
    res.render('screens/AddGoalPage', {
      title: 'Todo Manager - Add Goal ',
      css: '/css/goal.css',
      errors,
      goalName,
      description
  })
   }
  // *********UNCOMMENT IT BEFORE FINAL RUN ****************
  //  else if(today.getTime()>startDate.getTime()){
  //    errors.push({msg:'Start Date should be after today'})
  //    // send details to prepopulate form
  //    res.render('screens/AddGoalPage', {
  //     title: 'Todo Manager - Add Goal ',
  //     css: '/css/goal.css',
  //     errors,
  //     goalName,
  //     description
  // })
  //  }
   else {
     //Validation passed
     const diff_in_time=endDate.getTime()-startDate.getTime();
     
     const totalDays=diff_in_time/(1000*3600*24) + 1;

     // create an object for goal
     const newGoal=new Goal({
          goalName,
          startDate,
          endDate,
          description,
          totalDays,
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

  //@desc Delete goal
  //@route DELETE goal/:id
  //@access Private
  const removeGoal=async (req,res )=> {
    try{
      const goal=await Goal.findById(req.params.id);
      console.log(goal);
      if(goal){
        const task=await Task.find({goal: goal})
        console.log(task);
        // Firstly delete all the tasks under it
        if(task){
        await Task.remove({goal: goal});
        }
        
        // Now delete the goal
        await Goal.remove({_id: req.params.id });

        //after deleting redirect to dashboard
        res.redirect('/dashboard')

      }else{
        return res.render('screens/NotFoundErrorPage',{
          title: 'Todo Manager - Not Found'
        })
      }      
      // await Goal.remove({_id:req.params.id })
    }catch(err){
      return res.render('screens/NotFoundErrorPage',{
        title: 'Todo Manager - Not Found'
      })
    }
  }

  const showEditGoalPage=async (req,res )=> {
    try{
      let goal= await Goal.findById(req.params.id).lean();
      
      if(!goal){
        return res.render('screens/NotFoundErrorPage',{
          title: 'Todo Manager - Not Found'
        })
      }
      else{
        res.render('screens/EditGoalPage',{
          title: 'Todo Manager - Edit Goal ',
          goal,
          css: '/css/goal.css',
          helper: require('../helpers/ejshelper')
        });
      }
      
    }
    catch(err){

    }
  }

//@desc Update Goal
//@route PUT goal/:id
//@access Private
const editGoal=async(req,res) => {
  try {
    let goal= await Goal.findById(req.params.id);
    req.body.user=req.user.id;
    const {name,description,user}=req.body;

    const startDate=new Date(req.body.startDate);
    console.log(startDate);
    const endDate=new Date(req.body.endDate);
    console.log(endDate);
    
    if(!goal){
      return res.render('screens/NotFoundErrorPage',{
        title: 'Todo Manager - Not Found'
      })
    }else{
    //First check for client side validations-  mostly date errors
    if(startDate.getTime()>endDate.getTime()){
      errors.push({msg:'Start Date must be before End Date'})
      // send details to prepopulate form
      res.render('screens/EditGoalPage', {
          title: 'Todo Manager - Edit Goal ',
          goal,
          css: '/css/goal.css',
          helper: require('../helpers/ejshelper')
    })
    
     }  else{
         //Validation passed
     const diff_in_time=endDate.getTime()-startDate.getTime();
     
     const totalDays=diff_in_time/(1000*3600*24) + 1;
     
     goal.name=name;
     goal.startDate=startDate;
     goal.endDate=endDate;
     goal.totalDays=totalDays;
     goal.description=description;
     goal.user=user

     // now finally update the goal.
     const updatedGoal=await goal.save();
      // after successfully updating redirect to dashboard
      res.redirect('/dashboard')

     }

    }
  } catch (error) {
    return res.render('screens/NotFoundErrorPage',{
      title: 'Todo Manager - Not Found'
    })
  }
}

//@desc Show goal Details page
//@route GET/goals/:id
//@access Private
const showSingleGoal=async (req,res) => {
  try{
    // const goal=await Goal.findById(req.params.id).lean();
    const tasks=await Task.find({
      goal: req.params.id
    });
   //console.log(tasks);
    
  // console.log(tasks);
      res.render('screens/GoalDetailsPage',{
        layout: 'layouts/main',
         title: 'Todo Manager - Goal Page',
           css: '/css/dashboard.css',
           goal_id:req.params.id,
           tasks:tasks,
           name: req.user.name
      });      
    
  }catch(error){
    //console.log(tasks);
    //console.log(error);
    return res.render('screens/NotFoundErrorPage',{
      title: 'Todo Manager - Not Found'
    })
  }}

//@desc Show Task Reports of each goal.
//@route goals/taskReport/:id
//@access Private
const showTaskReportPage=async (req,res) => {
  const tasks=await Task.find({
    goal: req.params.id
  })

  if(tasks){
    res.render('screens/TaskReportPage',{
    layout: 'layouts/main',
    title: 'Todo Manager - Task Report',
    css: '/css/report.css',
    tasks,
    name: req.user.name,
    helper: require('../helpers/ejshelper'),
    })
  }
}

module.exports={
    showGoalPage,
    addGoal,
    removeGoal,
    editGoal,
    showEditGoalPage,
    showSingleGoal,
    showTaskReportPage
}