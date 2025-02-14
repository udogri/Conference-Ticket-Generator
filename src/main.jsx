import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from './components/Navbar.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <Navbar  />
    <App />
    </ChakraProvider>
  </StrictMode>,
)
