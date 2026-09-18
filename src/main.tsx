import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>,
)

