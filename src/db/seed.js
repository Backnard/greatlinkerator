const { db, createLink, updateLink, createTags, createLinkTags, addTagsToLink, deleteLink } = require('./index');

async function dropTables() {
console.log('Entered seed.js dropTable');
   try {
    await db.query(`
    DROP TABLE IF EXISTS links_tags;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS links;
    
`)

console.log('successfully dropped all tables!');
   } catch (error) {
       throw error;
   } 
   
}

async function createDB() {
    console.log('Entered seed.js createDB');
    try {


        const links = await db.query(`
        CREATE TABLE
        links(
            id SERIAL PRIMARY KEY,
            url VARCHAR(255) UNIQUE,
            clicks INTEGER DEFAULT 0,
            comments TEXT, 
            share_date DATE DEFAULT CURRENT_TIMESTAMP
        );
        `);
        console.log('links table created');
    
        const tags = await db.query(`
        CREATE TABLE tags(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        );
        `)
        console.log('tags table created');

        const links_tags = await db.query(`
        CREATE TABLE
        links_tags(
            id SERIAL PRIMARY KEY,
            tags_id INTEGER REFERENCES tags(id),
            links_id INTEGER REFERENCES links(id),
            UNIQUE(tags_id, links_id)
        );
        `)

        console.log('link_tags table created!');

    } catch (error) {
        throw error;
    }

}

async function testDB() {
    
    // await createLink({url:'www.google.com', comment:'best place to go'});

    const linksArray=[
        {url:'www.facebook.com', comment:'this is no longer cool'}, 
        {url:'www.twitter.com', comment: 'a modern-day soapbox'},
        {url:'www.hulu.com', comment: 'why do they charge me AND show commercials?'},{url:'www.fullstack.com',comment: 'now I can work remotely from a tropical island'},
        {url:'www.reddit.com', comment: 'it can be disturbing sometimes'},
        {url:'www.pinterest.com', comment:'isnt this essentially what we are trying to build?'},
        {url:'www.react.semantic-ui.com', comment: 'this is our framework library for the project'},
        {url:'www.github.com', comment: 'This place is awesome!'}
    ];

    linksArray.forEach(link=>createLink(link));

    await updateLink(1, {comments: 'They own the world', clicks: 52});

    const tags = await createTags(['I need a job', 'Pay me lots of money', 'Will do SQL for Money']);

    console.log('created Tags:', tags);

    linksArray.forEach((link, index)=>addTagsToLink(index+1,tags));

    const newTag = await createLink({url: 'www.fullstackacademy.com', comment: ' give them your money!', tags:['New tag for new link', 'Tag for one-stop link creator']});

    await deleteLink(1);
}


async function seed() {
   try {
    console.log('starting db...');
    db.connect();
    console.log('db connected');
    await dropTables();
    await createDB();
    await testDB();
   } catch (error) {
       throw error;
   } 
   
}

seed()
    .catch(console.error)
    .finally(()=>{
        db.end();
    })

