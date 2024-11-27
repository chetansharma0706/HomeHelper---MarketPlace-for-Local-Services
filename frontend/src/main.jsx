import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthProvider from "./contexts/authContexts.jsx"; // Import the AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Wrap the App in AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>,
);
