const express = require('express');
const Router = express.Router();
const Project = require('../models/project');
const auth = require('../middleware/auth');

Router.post('/:id',auth, (req,res) => {
    const id = req.params.id.trim();

    if(!req.body.project || !req.body.title || !req.body.status || !req.body.priority || !req.body.source || !req.body.details || !req.body.assignee.name  || !req.body.reporter.name){
        return res.status(422).json({error:"please add all the fields"});
    }
    const task = {
        project: req.body.project,
        title: req.body.title,
        status: req.body.status,
        priority: req.body.priority,
        source: req.body.source,
        details: req.body.details,
        reporter: {
            name: req.body.reporter.name
        },
        assignee: {
            name: req.body.assignee.name
        }
    };
    console.log(id);
    Project.findOneAndUpdate({_id:id} ,{ $push:{tasks:task} })
    .then(() => {
        res.json('Task Added');
    })
    .catch((err) => {
        console.log(err);
    })
})

Router.put('/:project/:task', auth, async (req, res) => {

    try {
        if(!req.body.project || !req.body.title || !req.body.status || !req.body.priority || !req.body.source || !req.body.details || !req.body.assignee.name  || !req.body.reporter.name){
            return res.status(422).json({error:"please add all the fields"});
        }
        
        await Project.findOneAndUpdate({ _id: req.params.project, "tasks._id": req.params.task }, {
            $set: {
                "tasks.$.title": escape(req.body.title),
                "tasks.$.status": escape(req.body.status),
                "tasks.$.priority": escape(req.body.priority),
                "tasks.$.source": escape(req.body.source),
                "tasks.$.impact": escape(req.body.impact),
                "tasks.$.details": escape(req.body.details),
                "tasks.$.reporter": {
                    id: escape(req.body.reporter.id),
                    name: escape(req.body.reporter.name)
                },
                "tasks.$.assignee": {
                    id: escape(req.body.assignee.id),
                    name: escape(req.body.assignee.name)
                },
                "tasks.$.updated": Date.now()
            }
        });
        res.status(200).json('Task Updated');
    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = Router;