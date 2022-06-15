import axios from 'axios'

export const login = (data) => {
  console.log(data.tokenId)
  return axios.post('/googleLogin', { tokenId: data.tokenId })
}
