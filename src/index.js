import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'
axios.defaults.baseURL = process.env.REACT_APP_API_URL
if (localStorage.getItem('user')) {
  console.log('in')
  axios.defaults.headers.common = {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
  }
}
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
