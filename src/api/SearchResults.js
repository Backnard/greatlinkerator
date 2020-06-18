const express = require('express');
const searchRouter = express.Router();
const { getAllLinks } = require('../../db');

searchRouter.get('/', async (req, res, next)=>{
    //retrieve all saved links
    console.log('Entered SearchResults Router GET / ');
    const data = await getAllLinks();

    res.send({
        message: 'Entered SearchResults GET /',
        data
    })
})


module.exports= searchRouter