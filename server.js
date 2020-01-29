const express = require('express');

const accountRouter = require('./accounts/accountRouter');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountRouter);

server.get("/", (req, res) => {
    res.status(200).json({Message: "This server is ALIVE!!"})
})

module.exports = server;