// const TodoListRepository = require('../repos/todo-repo');
// const todoListRepository = new TodoListRepository();
const asynchandler = require("express-async-handler");
const Expensis = require("../models/Expensis");

const create = asynchandler( async (req, res) => {
  
    const newExpensis = req.body;
    const createdExpensis = await Expensis.create({...newExpensis,created_by:req.user._id,branch_id:parseInt(req.user.branch) || 1});
    return res.status(200).json({
        status:true,
         message:"expensis created successfully",
         data:{
            createdExpensis
         }
     })
    // res.status(201).json(createdTodo);

});

const getAll = asynchandler( async (req, res) => {
    if (req.user.role_id == 1) {
        const expensis = await Expensis.findAll({
            where: {},
            order: [['createdAt', 'DESC']] // Sort by 'amount' in descending order
          });
          return res.status(200).json({
            status:true,
             message:"expensis packages ",
             data:{
                expensis
             }
         })
      
    }

    const expensis = await Expensis.findAll({
        where: {branch_id:parseInt(req.user.branch)},
        order: [['createdAt', 'DESC']] // Sort by 'amount' in descending order
      });
      return res.status(200).json({
        status:true,
         message:"expensis packages ",
         data:{
            expensis
         }
     })

});

const update = asynchandler( async (req, res) => {

    const todoId = req.params.id;
    const updatedTodo = req.body;
    await todoListRepository.update(todoId, updatedTodo);
    res.status(204).end();

});

// const getById =  asynchandler (async (req, res) => {

//     const todoId = req.params.id;
//     const todo = await todoListRepository.findById(todoId);
//     res.json(todo);

// });

// const findByAssignedTo =  asynchandler (async (req, res) => {

//     // const todoId = req.params.id;
//     const todo = await todoListRepository.findByAssignedTo(req.user._id)
//     res.json(todo);

// });

// const findByCreatedBy =  asynchandler (async (req, res) => {

//     // const todoId = req.params.id;
//     const todo = await todoListRepository.findByCreatedBy(req.user._id)
//     res.json(todo);

// });


// const deleteById = asynchandler( async (req, res) => {

//     const todoId = req.params.id;
//     await todoListRepository.delete(todoId);
//     res.status(204).end();

// });

module.exports = {
  create,
//   getById,
  getAll,
//   update,
//   deleteById,
//   findByAssignedTo,
//   findByCreatedBy
  
};
