const  { Client }= require('pg');
const chalk = require('chalk');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/linkerator';
const db = new Client(connectionString);



module.exports= { db }; 