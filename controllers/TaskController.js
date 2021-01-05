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
//@route DELETE task/:id
//@access Private
const removeTask=async(req,res) => {
    try {
      await Task.remove({_id:req.params.id })
      res.redirect(``)
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
    const task = await Task.findById(req.params.id).lean();

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

module.exports={
    showAddTaskPage,
    addTask,
    removeTask,
    showEditTaskPage,
    editTask,
    showEditTaskProgressPage
}