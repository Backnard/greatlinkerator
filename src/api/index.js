const express = require('express');

const apiRouter = express.Router();

apiRouter.use('/', (req, res, next)=>{
    res.send('Entering /api successfully');
})


module.exports= apiRouter;

apiRouter.get('/', async(req, res, next) => {
    res.send({message: 'Successfully reached /api'});
    res.end();
})

const linksRouter = require('./links');
apiRouter.use('/links', linksRouter);

const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);