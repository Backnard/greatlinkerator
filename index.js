const express = require('express');
const { db } = require('./src/db');
const path = require('path');
db.connect();

const dotenv = require('dotenv').config();

const { PORT = 3001} = process.config;//process.env.PORT??

const server = express();

const apiRouter = require('./src/api');
//Static file server here

server.use(express.static(path.join(__dirname, './dist')));

server.use(express.json());

server.use('/api', apiRouter);

server.listen(PORT, ()=>console.log(`I'm listening to everything you say on port ${PORT}`));

server.get('/health', (req, res, next)=>{
    res.send('Server is active');
})