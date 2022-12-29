const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'password'
});

client.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Connected to database');
  }
});

const sql = fs.readFileSync('./tables.sql').toString();

client.query(sql, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Tables created');
    }
  });

module.exports = client;