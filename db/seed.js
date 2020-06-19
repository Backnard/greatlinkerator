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
            clicks INTEGER,
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
    
    await createLink({url:'www.google.com', comment:'best place to go'});

    await updateLink(1, {comments: 'They own the world', clicks: 52});

    const tags = await createTags(['I need a job', 'Pay me lots of money', 'Will do SQL for Money']);

    console.log('created Tags:', tags);
    
    await addTagsToLink(1,tags);

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

