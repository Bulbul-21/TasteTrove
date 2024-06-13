import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthenticationContextProvider } from "./context";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </React.StrictMode>,
)
