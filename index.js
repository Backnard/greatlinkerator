const express = require('express');
const { db } = require('./db');
db.connect();
const dotenv = require('dotenv');

const { PORT = 3000} = dotenv.config.PORT;

const server = express();

server.listen(PORT, ()=>console.log(`I'm listening to everything you say on port ${PORT}`));

const apiRouter = require('./src/api');
