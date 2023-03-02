import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import StatsPage from './pages/StatsPage';
import Percentage from './Percentage';


ReactDOM.render(
  <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/percentage" element={<Percentage />} />
      <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
