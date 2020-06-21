const express = require('express');
const searchRouter = express.Router();
const { getLinkByUrl } = require('../db');

searchRouter.get('/', (req, res, next)=>{
    console.log('Entered SearchResults Router GET / ');
    res.send({
    message: "You successfully reach search results GET/"

    })
    next()

})

searchRouter.get('/:url', async (req, res, next)=>{
    //retrieve all saved links
    console.log('Entered SearchResults Router GET /url ');
    const {url} = req.params
    try{
    const data = await getLinkByUrl(url);
    console.log("URL is Successful", data)
    res.send({
        message: 'Entered SearchResults GET /',
        data
    })
}catch(e){

    next(e)
}
})


module.exports= searchRouter