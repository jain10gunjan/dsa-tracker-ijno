import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';


ReactDOM.render(
  <BrowserRouter>
      <Routes>

      <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
