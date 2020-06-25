
const express = require('express');
const { getAllLinks, 
        createLink,
        createLinkTags, 
        updateLink,
        getLinkByTag,
        updateClickCount } = require("../db");
const linkRouter = express.Router();
const bodyparser = require('body-parser');
linkRouter.use(bodyparser.json());

// GET /api/links
///Router for GET LINKS(by P.V.)
linkRouter.get("/", async (req, res, next) => {

    console.log('Entered /links GET')
  const links = await getAllLinks();
    console.log('successfully retrieved all links: ', links);
  res.send({
    links,
    status:true,
    message: 'successfully retrieved all links'
  });
});

// POST /api/links (creates tags during link creation)
linkRouter.post("/", async (req, res, next) => {
    const {url, comment, date} = req.body;
    console.log('Entered /links POST. req.body: ', req.body);

    try {
        //creates tags during link creation???
        const link = await createLink({
            url,
            comment,
            date
        })

        console.log('New link created: ', link);
        res.send({
            message: 'new link created',
            data: link,
            status: true
        })
    } catch (error) {
        next(error)
    }
})
// PATCH /api/links/:id (used both to update comment/tags as well as to increment the click count)
linkRouter.patch('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {comments, tags, clicks} = req.body;
    const updateFields = {};

    console.log('Entered /links/:id PATCH. id: ', id, 'req.body: ', req.body);

    if (comments) {
        updateFields.comment = comments;
    }
    
    if (tags) {
        updateFields.tags = tags;
    }
    
    if(clicks){
        updateFields.clicks = clicks;
    }
    

    try {
        const updatedLink = await updateLink(id, updateFields);
        console.log('Edited link: ', updatedLink);
        res.send({
            message: 'link updated',
            data: updatedLink,
            status: true,
        });
    } catch (error) {
        next(error);
    }
})

linkRouter.get('/:id', async(req, res, next)=>{
    console.log('Entered links GET route /:id');
    const {id}= req.params;

    try {
        console.log('searching by id: ', id)
        const link = await updateClickCount(id);
        res.send({
            message:'successfully retrieved link',
            data: link,
            status: true
        })
    } catch (error) {
        next(error);
    }
})

linkRouter.get('/:tag', async (req, res, next)=>{
    const { tag } = req.params;

    try {
        const links = await getLinkByTag(tag);
        res.send({
            message: 'Successfully retrieved links',
            data: links,
            status: true
        })
    } catch (error) {
        next(error);
    }

})

module.exports = linkRouter;
