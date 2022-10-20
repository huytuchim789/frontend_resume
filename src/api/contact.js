import axios from 'axios'

export const contact = (data) => {
  console.log(data)
  return axios.post('/contact', data)
}
export const getAllFilesApi = () => {
  return axios.get(
    'http://dashboard.ulake.usth.edu.vn/api/folder/158951/entries',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token_csv')}`,
      },
    }
  )
}
export const updateCsv = () => {
  return axios.post('/update-csv', {
    access_token_csv: localStorage.getItem('access_token_csv'),
  })
}
