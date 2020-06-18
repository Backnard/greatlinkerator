const express = require('express');
const tagsRouter = express.Router();
const { } = require('../db');

tagsRouter.get('/:tagName/links', async (req, res, next) => {
    const { tagName } = req.params;
   
    try {
      const getTagged = await getLinksByTagName(tagName);
      res.send({ getTagged })
     
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


module.exports = tagsRouter;