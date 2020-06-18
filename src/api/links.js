const express = require('express');
const { getAllLinks} = require('../../db');
const linkRouter = express.Router();
// GET /api/links
// POST /api/links (creates tags during link creation)
// PATCH /api/links/:id (used both to update comment/tags as well as to increment the click count)



///Router for GET LINKS(by P.V.)
linkRouter.get('/', async (req, res) => {
    const links = await (getAllLinks());
  
    res.send({
      links
    });
  });


  module.exports = linkRouter;
