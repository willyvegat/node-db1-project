const db = require('../../data/db-config')

const getAll = () => {
  // const result = await db('accounts');
  // return result;
  return db('accounts');
}

const getById = (id) => {
  // const result = await db('accounts').where('id', id).first()
  // return result;
  return db('accounts').where('id', id).first();
}

const create = async (account) => {
  const [id] = await db('accounts').insert(account);
  const result = await getById(id);
  return result;
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
