import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// GET all persons
const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

// POST (add person)
const create = newObject => {
  return axios.post(baseUrl, newObject).then(res => res.data)
}

// PUT (update person)
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)
}

//delete person
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
}

export default {
  getAll,
  create,
  update,
  remove
}
