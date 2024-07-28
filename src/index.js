import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Ensure the correct path
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
      <ToastContainer autoClose={3000} pauseOnHover={false} theme='light' />
    </BrowserRouter>
  </AuthProvider>
);
