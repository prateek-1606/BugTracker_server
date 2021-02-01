const express = require('express');
const Router = express.Router();
const Project = require('../models/project');
const auth = require('../middleware/auth');
const project = require('../models/project');

Router.get('/',(req,res) => {
    Project.find()
    .then((projects) => {
        res.json(projects);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

Router.get('/:id',(req,res) => {
    const id = req.params.id.trim();
    Project.findOne({_id:id})
    .then((project) => {
        res.json(project);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    }) 
})

Router.post('/' ,auth,(req,res) => {
    const {title,status,details,priority} = req.body;
    if(!title || !status || details || !priority){
        return res.status(422).json({error:"please add all the fields"});
    }
    const newProject = new Project({
        title,
        status:status,
        priority:priority,
        details,
        createdAt:Date.now(),
        updatedAt:Date.now()
    })
    newProject.save()
    .then((project) => {
        res.json(project);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

Router.put('/:id',auth,(req,res) => {
    const id = req.params.id;
    if(!req.body.title || !req.body.status || !req.body.details || !req.body.priority){
        return res.status(422).json({error:"please add all the fields"});
    }
    Project.findOneAndUpdate({_id:id} , {
        "$set":{
            "title":req.body.title,
            "status":req.body.status,
            "priority":req.body.priority,
            "details":req.body.details,
            "updatedAt":Date.now()
        }
    }).then(() => {
        res.json('Project Updated')
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

Router.delete('/:id',auth,(req,res) => {
    const id = req.params.id.trim();
    Project.findOneAndDelete({_id:id})
    .then(() => {
        res.json('Project Deleted')
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    })
})


module.exports = Router;