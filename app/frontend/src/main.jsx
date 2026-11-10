import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import './index.css'
import App from './App.jsx'
import { loadSession } from './auth'

await loadSession()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
