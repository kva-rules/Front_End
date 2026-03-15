import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from './app/store'
import { ThemeProvider } from './providers/ThemeProvider'
import { AuthProvider } from './context/AuthContext'
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary'
import { GlobalErrorNotifier } from './components/GlobalErrorNotifier'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <AuthProvider>
              <GlobalErrorNotifier />
              <App />
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </GlobalErrorBoundary>
  </React.StrictMode>
)
