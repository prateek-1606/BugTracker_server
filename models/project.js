const {Schema,model} = require('mongoose');

const taskSchema = new Schema({
    project:String,
    title:String,
    status:String,
    priority:String,
    details:String,
    source:String,
    reporter:{
        name:String
    },
    assignee:{
        name:String
    },
    createsAt:Date,
    updatedAt:Date
})

const ProjectSchema = new Schema({
    title:String,
    status:String,
    priority:String,
    details:String,
    tasks:[taskSchema],
    createsAt:Date,
    updatedAt:Date
})

module.exports = model('Project',ProjectSchema);