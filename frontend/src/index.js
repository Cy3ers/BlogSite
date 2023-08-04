import React from 'react';
import ReactDOM from 'react-dom/client';
import { EditBlogProvider } from './contexts/EditBlogContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EditBlogProvider>
    <App />
  </EditBlogProvider>
);
