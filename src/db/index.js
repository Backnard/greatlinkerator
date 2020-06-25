const  { Client }= require('pg');
const chalk = require('chalk');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/linkerator';
const db = new Client(connectionString);

//create link
async function createLink({url, comment, date=null }) {

    try {
        console.log('Entered db createLink: ', url, 'comment:',comment, 'date:',date);

        const {rows: [newLink]} = await db.query(`
    INSERT INTO links("url", "comments", "share_date") VALUES ($1, $2, $3)
    RETURNING *;
    `, [url, comment, date]);

    console.log('From db: created new link: ', newLink);
        return newLink;
    } catch (error) {
        throw error;
    }
    
}

async function createQueryStrings(fields) {

    const setString = Object.keys(fields).map((key, index)=>{
        return `"${key}"=$${index+1}`}).join(',');
    
    const queryString = Object.values(fields);

    return { setString, queryString  };
}

async function updateLink(linkId, fields={}) {
    try {
        console.log('Entered db updateLink');

        const {setString, queryString} = await createQueryStrings(fields);

        const { rows:[link] } = await db.query(`
        UPDATE links
        SET ${setString}
        WHERE id = ${linkId}
        RETURNING *;
        `, queryString)

        console.log('updated link:', link);

    } catch (error) {
        throw error;
    }
}

//create new tag
async function createTags(tags) {

    console.log('Entered db createTags')

    const tagsString = tags.map((key, index)=>{
        return `$${index+1}`}).join('),(');
   

    try {
        //NOTE: RETURNS AN ARRAY OF OBJECTS!
        const { rows:insertedTags } = await db.query(`
        INSERT INTO tags(name)
        VALUES (${tagsString})
        RETURNING *;
        `,Object.values(tags));

        console.log('inserted tags: ', insertedTags)
        return insertedTags;

    } catch (error) {
        throw error;
    }
}


async function createLinkTags(linkId, tagId) {
    console.log('Entered db createLinkTags');
    try {
       const { rows:tags } = await db.query(`
            INSERT INTO links_tags("tags_id", "links_id")
            VALUES($1, $2)
            ON CONFLICT(tags_id, links_id) DO NOTHING
            RETURNING *;
        `, [tagId, linkId]);

        console.log('inserted values:', tags);

    } catch (error) {
        throw error;
    }
}

async function addTagsToLink(linkId, tags) {
    console.log('Entered db addTagsToLink');

    try {
        const tagLinkPromises= tags.map(tag=>{
            return createLinkTags(linkId, tag.id);
        })
        
        await Promise.all(tagLinkPromises);

        return await getLinkById(linkId);


    } catch (error) {
        
    }
    
}

async function updateClickCount(linkId) {
    console.log('Entered db updateClickCount');
    try {
        const { rows: link} = await db.query(`
        UPDATE links
        SET clicks = clicks + 1
        WHERE id = $1;
        `, [linkId]);

        console.log('successfully updated click count for link: ', link)
    } catch (error) {
        
    }
}

async function getLinkById(linkId) {

    console.log('Entered db getLinkById with linkId:', linkId);

    const { rows: [links] } = await db.query(`
        SELECT * FROM links
        WHERE id=$1;
    `,[linkId]);


    if(!links){
        throw({
            message: 'No links with that id',
            error:'NoLinkIdError'
        })
    }

    const { rows: tags } = await db.query(`
        SELECT tags.* FROM tags
        JOIN links_tags ON tags.id = links_tags.tags_id
        WHERE links_tags.links_id = $1;
    `, [linkId]);

    links.tags = tags;

    console.log('returned links with tags:',links);
    return links;
}

async function getAllLinks() {
    console.log('Entered db getAllLinks');

    const { rows: links } = await db.query(`
        SELECT * FROM links;
    `)

    console.log('All Links:', links);
    return links;
}

async function deleteLink(linkId) {
    //delete link, delete linktags
    console.log('Entered bd deleteLink');
    try {
        const { rows: linkTags } = await db.query(`
        DELETE FROM links_tags
        WHERE links_id = ${linkId}
        RETURNING *;
        `)
    
        const { rows: [link] } = await db.query(`
        DELETE FROM links
        WHERE id=${linkId}
        RETURNING *;
        `)
        console.log('Deleted link: ', link, 'tags: ',linkTags);

        return link;

    } catch (error) {
        throw error;
    }
}
async function getLinkByUrl(url) {
try{
    console.log("entered getLINKbyURL")
    const {rows } = await db.query(`
    SELECT *
    FROM links
    WHERE url LIKE '%${url}%';
    `)
    console.log("HERE ARE YOUR URL ROWS", rows)
    return rows;
}catch(e){
    throw e
}
};

async function getLinkByTag(tag) {

    console.log('Entered db getLinkByTag')
    try {
        const { rows:[link] } = await db.query(`
        SELECT * FROM links
        JOIN links_tags
        ON links.id = links_tags.links_id
        JOIN tags ON links_tags.tags_id = tags.id
        WHERE tags.name LIKE '%${tag}%';
        `);

        console.log('Successfully retrieved link: ', link);
        return link; 

    } catch (error) {
        throw error;
    }
}

async function searchAllLinks(searchTerm) {
    let searchResults =[];
    const promiseArray = [getLinkByTag(searchTerm), getLinkByUrl(searchTerm)];
    const results = await Promise.all(promiseArray);

    
    console.log(results);
}

module.exports= { 
    db, 
    createLink, 
    updateLink,
    createTags,
    createLinkTags,
    addTagsToLink,
    getAllLinks,
    deleteLink,
    getLinkByUrl,
    getLinkByTag, 
    searchAllLinks, 
    getLinkById,
    updateClickCount
 }; 