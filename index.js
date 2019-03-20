const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile.js');
const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.unsubscribe(express.json());

// GET all cohorts

// GET cohort by id

// GET all students for cohort id

// POST cohort

// PUT cohort

// DELETE cohort

const port = process.env.PORT || 5000;
server.listen(port);