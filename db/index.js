const  { Client }= require('pg');
const chalk = require('chalk');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/The-Great-Linkerator';
const db = new Client(connectionString);





module.exports= {db}; 