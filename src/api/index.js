require('dotenv').config();

const server = require('express');
const apiRouter = server.Router();

apiRouter.get('/', async(req, res, next) => {
    res.send({message: 'Successfully reached /api'});
    res.end();
})

const linksRouter = require('./links');
apiRouter.use('/links', linksRouter);

const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);