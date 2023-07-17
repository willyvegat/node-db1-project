// const db = require('../../data/db-config');
const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  if (!name || !budget) {
    next({ status: 400, message: "name and budget are required" })
  } 
  // else if (name.trim() === name.trim().length < 3 || name.trim() === name.trim() > 100) {
  //   next({ status: 400, message: "name of account must be between 3 and 100" })
  // }
  
  else {
    req.name = name.trim();
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  // const account = await db('accounts').where('id', req.params.id).first();
  // if (!account) {
  //   next({ status: 404, message: 'account not found'});
  // } else {
  //   next();
  // }
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      next({ status: 404, message: 'account not found' })
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }

}
