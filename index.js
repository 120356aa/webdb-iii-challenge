const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile.js');
const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// GET all cohorts
server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET cohort by id
server.get('/api/cohorts/:id', async (req, res) => {
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all students for cohort id
server.get('/api/cohorts/:id/students', async (req, res) => {
  const { id } = req.params;
  
  try {
    const cohort = await db('cohorts')
      .where({ cohort_id: id})
      .innerJoin('students', 'cohorts.id', '=', 'students.cohort_id');
      
    const findCohort = await db('cohorts')
      .where({ id })
      .first();

    if (findCohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({message: 'Cohort not found'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST cohort
server.post('/api/cohorts', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);

    const cohort = await db('cohorts')
      .where({ id })
      .first();

    res.status(201).json(cohort);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT cohort
server.put('/api/cohorts/:id', async (req, res) => {
  try {
    const update = await db('cohorts')
      .where({ id: req.params.id })
      .update(req.body);

    if (update > 0) {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();
      
      res.status(200).json(cohort);
    } else {
      res.status(404).json({message: 'Record not found'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE cohort
server.delete('/api/cohorts/:id', async (req, res) => {
  try {
    const del = await db('cohorts')
      .where({ id: req.params.id })
      .del();

    if (del > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({message: 'Cohort not found'})
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const port = process.env.PORT || 5000;
server.listen(port);