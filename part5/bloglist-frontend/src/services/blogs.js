import axios from 'axios'
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = newToken
}

export default { getAll, setToken }