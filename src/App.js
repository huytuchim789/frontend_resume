import React, { useEffect } from 'react'
import { ResumeProvider, useResume } from './Context'
import './App.css'
import Navbar from './components/Layouts/Navbar'
import Footer from './components/Layouts/Footer'
import Main from './components/Main'
import WebFont from 'webfontloader'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import { routes } from './routes'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Spinner, Center } from '@chakra-ui/react'

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Pacifico', 'Poppins'],
      },
    })
  }, [])

  return (
    <>
      <VStack justify="space-between" height={'100vh'}>
        <ResumeProvider>
          {' '}
          <BrowserRouter>
            <Navbar />

            <Routes>
              {routes.map((r, index) => (
                <Route key={index} element={r.element} path={r.path} />
              ))}
            </Routes>
            <Footer />
          </BrowserRouter>
        </ResumeProvider>
      </VStack>
    </>
  )
}

export default App
