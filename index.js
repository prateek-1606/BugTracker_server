const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {MONGO_URL} = require('./config');
const app = express();
const AuthRoute = require('./routes/auth'); 
const ProjectRoute = require('./routes/project')
const TaskRoute = require('./routes/task');

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
mongoose.connect(MONGO_URL,{ useNewUrlParser:true,useUnifiedTopology: true  })
.then(() => {
    console.log('Mongodb connected');
    return app.listen({port:PORT})
})
.then(() => {
    console.log('Server Running');
})

app.use('/auth',AuthRoute);
app.use('/project',ProjectRoute);
app.use('/tasks',TaskRoute);

app.get('/',(req,res) => {
    res.send('Kuch Bhi');
})