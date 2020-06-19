const express = require('express');
const { db } = require('./db');
db.connect();

const dotenv = require('dotenv').config();

const { PORT = 3001} = process.config;//process.env.PORT??

const server = express();

const apiRouter = require('./src/api');

server.use(express.json());

server.use('/api', apiRouter);

server.listen(PORT, ()=>console.log(`I'm listening to everything you say on port ${PORT}`));

server.get('/health', (req, res, next)=>{
    res.send('Server is active');
})