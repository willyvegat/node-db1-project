const express = require('express');
const Account = require('./accounts-model');
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware');

const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // try {
  //   const account = await Account.getById(req.params.id);
  //   res.json(account);
  // } catch (err) {
  //   next(err);
  // }
  res.json(req.account);
})

router.post(
  '/', 
  checkAccountPayload, 
  checkAccountNameUnique, 
  async (req, res, next) => {
    try {
      const newAccount = await Account.create(req.body);
      res.status(201).json(newAccount);
    } catch (err) {
      next(err);
    }
})

router.put(
  '/:id', 
  checkAccountId, 
  checkAccountPayload, 
  checkAccountNameUnique, 
  (req, res, next) => {
    try {
      res.json('update account');
    } catch (err) {
      next(err);
    }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  try {
    res.json('delete account');
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
