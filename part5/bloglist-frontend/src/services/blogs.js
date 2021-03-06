import axios from 'axios'
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  console.log('token', token)
  const config = {
    headers: { Authorization: token }
  };
  console.log(config)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
}

export default { getAll, setToken, create }