import axios from 'axios'

export const contact = (data) => {
  console.log(data)
  return axios.post('/contact', data)
}
