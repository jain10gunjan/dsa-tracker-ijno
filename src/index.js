import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import StatsPage from './pages/StatsPage';
import Arrays from './topics/Arrays';


ReactDOM.render(
  <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/arrays" element={<Arrays />} />
      <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
