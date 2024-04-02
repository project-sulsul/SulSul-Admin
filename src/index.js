import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CommonProvider } from './stores';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CommonProvider>
      <App />
    </CommonProvider>
  </React.StrictMode>
);

reportWebVitals();
