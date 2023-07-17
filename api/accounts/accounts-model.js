const db = require('../../data/db-config')

const getAll = async () => {
  const result = await db('accounts');
  return result;
}

const getById = async (id) => {
  const result = await db('accounts').where('id', id).first()
  return result;
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
