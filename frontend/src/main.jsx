import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/poppins'
import './index.css'
import { store } from './store.js'
import { TokenCheck } from './components'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
  fonts: {
    body: `'Poppins', sans-serif`
  }
}
const theme = extendTheme({config})

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider 
      theme={theme}
      toastOptions={{ defaultOptions: { position: 'bottom', variant: 'top-accent', duration: 3000, status: 'success' } }}
    >
      <Provider store={store}>
        <TokenCheck />
        <App />
      </Provider>    
    </ChakraProvider>
  </StrictMode>,
)
