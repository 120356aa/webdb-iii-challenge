const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile.js');
const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.unsubscribe(express.json());

// GET all cohorts
server.get('/api/cohorts', async (req, res) => {

});

// GET cohort by id
server.get('/api/cohorts/:id', async (req, res) => {

});

// GET all students for cohort id
server.get('/api/cohorts/:id/students', async (req, res) => {

});

// POST cohort
server.post('/api/cohorts', async (req, res) => {

});

// PUT cohort
server.put('/api/cohorts/:id', async (req, res) => {

});

// DELETE cohort
server.delete('/api/cohorts/:id', async (req, res) => {

});

const port = process.env.PORT || 5000;
server.listen(port);