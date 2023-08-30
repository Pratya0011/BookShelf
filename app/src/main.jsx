import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store.jsx'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
    <App />
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
