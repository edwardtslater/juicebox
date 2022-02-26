// server
require('dotenv').config();
const { PORT = 3000 } = process.env
const express = require('express');
const server = express();


const client = new Client(
  process.env.DATABASE_URL || {
    user: "postgres",
    password: "postgres",
    database: "juiceboxdev",
  }
);



const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json())

// server.get('/add/:first/to/:second', (req, res, next) => {
//   res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
//     Number(req.params.first) + Number(req.params.second)
//    }</h1>`);
// });



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


