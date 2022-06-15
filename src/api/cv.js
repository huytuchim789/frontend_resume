import axios from 'axios'

export const addCV = (data) => {
  console.log(data)
  return axios.post('/addCV', data, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const myCVs = (data) => {
  return axios.get('/myCVs')
}
export const getCV = (email) => {
  return axios.get('/getCV', { params: { email } })
}
