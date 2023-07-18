const db = require('../../data/db-config');
const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const error = { status: 400 };
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    error.message = "name and budget are required";
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = "name of account must be between 3 and 100";
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = "budget of account must be a number";
  } else if (budget < 0 || budget > 1000000) {
    error.message = "budget of account is too large or too small";
  }

  if (error.message) {
    next(error);
  } else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existingName = await db('accounts')
      .where('name', req.body.name.trim())
      .first();

      if (existingName) {
        next({ status: 400, message: "that name is taken" })
      } else {
          // req.body.name.trim();
          next()
      }
  } catch (err) {
    next(err);
  }
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
