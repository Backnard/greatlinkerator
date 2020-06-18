const express = require('express');

const server = express();

const BodyParser = require('body-parser');
server.use(BodyParser.json());

const searchRouter = require('./SearchResults');
server.use('/SearchResults',searchRouter);

// server.use('/', (req, res, next)=>{
//     res.send('Welcome to /api!');
//     next();
// })




