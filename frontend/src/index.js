import React from 'react';
import ReactDOM from 'react-dom';
import { EditBlogProvider } from './contexts/EditBlogContext';
import App from './App';

ReactDOM.render(
  <EditBlogProvider>
    <App />
  </EditBlogProvider>,
  document.getElementById('root')
);
