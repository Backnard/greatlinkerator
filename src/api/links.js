const express = require('express');
const { getAllLinks} = require('../db');
const linkRouter = express.Router();


///Router for GET LINKS(by P.V.)
linkRouter.get('/', async (req, res) => {
    const links = await (getAllLinks());
  
    res.send({
      links
    });
  });


  module.exports = linkRouter;