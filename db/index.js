// inside db/index.js
const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
const client = new Client ({
    password: "postgres",
    database: "juiceboxdev",
    user: "postgres",
});

async function createUser({ username, password }) {
  try {
    const result = await client.query(`
    SELECT id, username 
    FROM users;
    `, `[username, password]`);

    return result;
  } catch (error) {
    throw error;
  }
}


async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username 
      FROM users;
    `);
  
    return rows;
  }
 
module.exports = {
  client,
  getAllUsers,
  createUser,

}