const express=require('express');
const cors=require('cors');
require('dotenv').config()
const chatRoutes=require('./routes/chat.routes');
const app=express();
app.use(cors())
app.use(express.json());
app.use('/api',chatRoutes)



module.exports=app;