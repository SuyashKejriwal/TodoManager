const Task=require('../models/Task')

//@desc Show Add Task Page
//@route GET /tasks/add
//@access Private
const showAddTaskPage=(req,res)=>{
    //console.log(req.user);
    console.log('Goal id ');
    console.log(req.params.id);
      res.render('screens/AddTaskPage',{
          title: 'Todo Manager - Add Task ',
          css: '/css/task.css',
          goal: req.params.id
        });
}

//@desc Add Task in database
//@route POST/tasks/add/goals/:id
//@access Private
const addTask=async(req,res)=> {
 try {
    req.body.user=req.user.id
    console.log(req.body);
     const {taskName,priority,taskType,target,goal,user}=req.body;

     let errors=[];
     //Check validations
     if(!taskName||!priority||!taskType){
      errors.push({msg:'Please fill in all the fields'})
      // send details to prepopulate forms
      res.render('screens/AddGoalPage', {
        title: 'Todo Manager - Add Task ',
        css: '/css/goal.css',
        errors,
        goalName,
        startDate,
        endDate,
        description
    })
     }
     else if(taskType=='numerical'&&target===' '){

     }

     // create an object for goal
     const newTask=new Task({
        taskName,
        priority,
        taskType,
        target,
        goal,
        user
   });

   console.log(newTask);
     // save goal
     newTask
     .save()
     .then((task)=>{
       // task successfully added
        res.redirect(`/goals/${goal}`);
     })
     .catch((err)=>{
       console.log(err);
     })
 } catch (error) {
     
 }
}

//@desc Delete Task from Database
//@route DELETE task/:id/goal/:goalid
//@access Private
const removeTask=async(req,res) => {
    try {
      const task=await Task.findById(req.params.id);
      if(task){
        await Task.remove({_id: req.params.id });
      }
      res.redirect(`/goals/${req.params.goalId}`)
    } catch (error) {
        return res.render('screens/NotFoundErrorPage',{
            title: 'Todo Manager - Not Found'
          })
    }
}

//@desc Show Edit Task Page
//@route GET edit/:id
//@access Private
const showEditTaskPage=async(req,res) => {
  try{
    const task = await Task.findById(req.params.id);
console.log(task);
    res.render('screens/EditTaskPage',{
      title: 'Todo Manager- Edit Task',
      css: '/css/task.css',
      task: task
    })
  }catch(error){
    return res.render('screens/NotFoundErrorPage', {
        title: 'Todo Manager- Not Found'
    })
  }
}

//@desc Edit Task in Database
//@route PUT tasks/:id
//@access Private
const editTask=async(req,res) =>{
    try {
        let task=await Task.findById(req.params.id);

        const {taskName,priority,taskType,target}=req.body;

        if(!task){
          return res.render('screens/NotFoundErrorPage',{
            title: 'Todo Manager - Not Found'
          })
        }else{
          task.taskName=taskName;
          task.priority=priority;
          task.taskType=taskType;
          task.target=target;

          //now finally update the Task
          const updatedTask=await task.save();

          //after successfully updating redirect to goal details page
          res.redirect(`/goals/${task.goal._id}`);

        }
    } catch (error) {
        
    }
}

//@desc Show edit task progress page
//@route GET tasks/editProgress/:id
//@access Private
const showEditTaskProgressPage=async(req,res) => {
  try{
    const task = await Task.findById(req.params.id).lean();

    res.render('screens/EditTaskProgressPage',{
      layout: 'layouts/main',
      title: 'Todo Manager- Edit Task Progress',
      css: '/css/editTaskProgress.css',
      task: task
    })
  }catch(error){
    return res.render('screens/NotFoundErrorPage', {
      title: 'Todo Manager- Not Found'
    })
  }
}

//@desc Edit Task Progress in Database
//@route PUT tasks/editProgress/:id
//@access Private
const editTaskProgress=async(req,res) => {
  try{
    const taskinDB=await Task.findById(req.params.id);

    const { targetCompleted,completed}=req.body;
        console.log(targetCompleted);
        console.log(completed);
        var progress=0;
    // first take progress from input fields 
    if(taskinDB.taskType=='yes_or_no'){
      if(completed==='yes'){
        progress=100;
      }
    }
    else if(taskinDB.taskType==='numerical'){
      
      var decimalprogress=((targetCompleted/taskinDB.target)*100);
        progress=parseInt(decimalprogress);
        console.log(progress);
    }

    console.log(progress);
    // set new progress
    taskinDB.progress=progress;

    const updatedTask= await taskinDB.save();

    //now redirect to goal details page
    res.redirect(`/goals/${taskinDB.goal._id}`);

  }catch(error){

  }
}

module.exports={
    showAddTaskPage,
    addTask,
    removeTask,
    showEditTaskPage,
    editTask,
    showEditTaskProgressPage,
    editTaskProgress
}