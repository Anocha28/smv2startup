import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/poppins'
import './index.css'
import { store } from './store.js'
import { TokenCheck } from './components'

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
  fonts: {
    body: `'Poppins', sans-serif`
  }
}
const theme = extendTheme({config})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider 
      theme={theme}
      toastOptions={{ defaultOptions: { position: 'top-right', duration: 3000, variant: 'subtle', status: 'success' } }}
    >
      <Provider store={store}>
        <TokenCheck />
        <App />
      </Provider>    
    </ChakraProvider>
  </React.StrictMode>,
)
