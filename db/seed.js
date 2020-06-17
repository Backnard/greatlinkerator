const { db } = require('./index');

async function dropTables() {
console.log('Entered seed.js dropTable');
   try {
    await db.query(`
    DROP TABLE IF EXISTS links;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS links_tags;
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
            share_date DATE
        );
        `);
        console.log('links table created');
    
        const tags = await db.query(`
        CREATE TABLE tags(
            id SERIAL PRIMARY KEY,
            tags VARCHAR(255) UNIQUE NOT NULL
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


async function seed() {
   try {
    console.log('starting db...');
    db.connect();
    console.log('db connected');
    await dropTables();
    await createDB();
   } catch (error) {
       throw error;
   } 
   
}

seed()
    .catch(console.error)
    .finally(()=>{
        db.end();
    })

