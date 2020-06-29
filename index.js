require('dotenv').config();

const express = require('express');
const { db } = require('./src/db');
const path = require('path');
const BodyParser = require('body-parser');
db.connect();



const { PORT = 3001} = process.env.PORT;

const server = express();
server.use(BodyParser.json());

const apiRouter = require('./src/api');
//Static file server here

server.use(express.static(path.join(__dirname, './dist')));

server.use('/api', apiRouter);

server.listen(PORT, ()=>console.log(`I'm listening to everything you say on port ${PORT}`));

server.get('/health', (req, res, next)=>{
    res.send('Server is active');
})