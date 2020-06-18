const express = require('express');

const apiRouter = express.Router();

apiRouter.use('/', (req, res, next)=>{
    res.send('Entering /api successfully');
})


module.exports= apiRouter;

