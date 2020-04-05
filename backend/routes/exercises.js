const exerciseRouter = require('express').Router();
let Exercise = require('../models/exercise.model')
 

exerciseRouter.route('/userExercise').post((req, res)=>{
    const userid = req.body.userid;
    Exercise.find({userid: userid })
    .then(items => {
        res.json(items)}
        )
    .catch(err => res.status(400).json('Error' + err))
})

exerciseRouter.route('/:id').delete((req, res)=>{
    const exerId = req.params.id;
    Exercise.findByIdAndDelete({_id: exerId })
    .then(() => {
        res.json("Exercise deleted")}
        )
    .catch(err => res.status(400).json('Error' + err))
})
exerciseRouter.route('/update').post((req, res)=>{
    const exerId = req.body.id;
    Exercise.findById({_id: exerId })
    .then(exercise => {
       exercise.username = req.body.username,
       exercise.description =req.body.description,
       exercise.duration =req.body.duration,
       exercise.date =req.body.date
       exercise.save()
       .then(() => res.json("Exercise updated"))
       .catch(err => res.status(400).json('Error' + err))
    })
    .catch(err => res.status(400).json('Error' + err))
})
exerciseRouter.route('/edit').post((req, res)=>{
    console.log(req)
    var ObjectId = require('mongoose').Types.ObjectId; 
var query = { _id: new ObjectId(req.body.id) };
    Exercise.find(query)
    .then(items  => res.json(items))
    .catch(err => res.status(400).json('Error' + err))
})

exerciseRouter.route('/add').post(function(req, res) {
    const username = req.body.username;
    const userid = req.body.userid;
    const description = req.body .description;
    const duration = req.body.duration;
    const date = req.body.date;
    
    const newExercise = new Exercise({
        username,userid,description,duration,date,
    });
        newExercise.save()
        .then(reg => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(400).send("Failed to store to database");
        });
});
module.exports = exerciseRouter;