const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  const account = await db('accounts').where('id', req.params.id).first();
  if (!account) {
    next({ status: 404, message: 'account not found'});
  } else {
    next();
  }
}
