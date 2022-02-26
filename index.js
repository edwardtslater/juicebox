// server
require('dotenv').config();
const { PORT = 3000 } = process.env
const express = require('express');

const server = express();
server.use(express.json());

const morgan = require('morgan');
server.use(morgan('dev'));



const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});



//Router

const apiRouter = require('./api');
const req = require('express/lib/request');
server.use('/api', apiRouter);


// Middleware
server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

server.use(async (req, res, next) => {
  const prefix = 'Bearer '
  const auth = req.headers['Authorization'];

  if (!auth) {
    next(); // don't set req.user, no token was passed in
  }


  if (auth.startsWith(prefix)) {
    // recover the token
    const token = auth.slice(prefix.length);
    try {
      // recover the data
      const { id } = jwt.verify(data, 'secret message');

      // get the user from the database
      const user = await getUserById(id);
      // note: this might be a user or it might be null depending on if it exists

      // attach the user and move on
      req.user = user;

      next();
    } catch (error) {
      // there are a few types of errors here
    }
  }
});



