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

  //@desc Delete goal
  //@route DELETE goal/:id
  //@access Private
  const removeGoal=async (req,res )=> {
    try{
      await Story.remove({_id:req.params.id })
      res.redirect('/dashboard')

    }catch(err){
      return res.render('screens/NotFoundErrorPage',{
        title: 'Todo Manager - Not Found'
      })
    }
  }

//@desc Update Goal
//@route PUT goal/:id
//@access Private
const editGoal=async(req,res) => {
  try {
    let goal= await Goal.findById(req.params.id).lean();

    if(!goal){
      return res.render('screens/NotFoundErrorPage',{
        title: 'Todo Manager - Not Found'
      })
    }else{
      goal=await goal.findOneAndUpdate({_id:req.params.id},req.body,{
        new:true,
        runValidators:true,
    })

    res.redirect('/dashboard')
    }
  } catch (error) {
    return res.render('screens/NotFoundErrorPage',{
      title: 'Todo Manager - Not Found'
    })
  }
}

//@desc Show goal Details page
//@route GET/goal/:id
//@access Private
const showSingleGoal=async(req,res) => {
  try{
    const goal=await Goal.findById(req.params.id).lean();

    if(!goal){
      return res.render('screens/NotFoundErrorPage',{
        title: 'Todo Manager - Not Found'
      })
    }else{
      const tasks=Task.find({
        goal: req.params.id
      }).lean();

      res.render('screens/GoalDetailsPage',{
        layout: 'layouts/main',
         title: 'Todo Manager - Goal Page',
           css: 'css/home.css'
      });      
    }
  }catch(error){
    return res.render('screens/NotFoundErrorPage',{
      title: 'Todo Manager - Not Found'
    })
  }}


module.exports={
    showGoalPage,
    addGoal,
    removeGoal,
    editGoal,
    showSingleGoal
}