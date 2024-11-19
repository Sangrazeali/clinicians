import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import App from './App';
import './index.css';
import { AppProvider } from './context-api/app-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <NextUIProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </NextUIProvider>
  </React.StrictMode>
);
