const express = require('express');
const Account = require('./accounts-model');
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware');

const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const data = await Account.getById(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
})

router.post('/', checkAccountPayload, async (req, res, next) => {
  try {
    const data = await Account.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
