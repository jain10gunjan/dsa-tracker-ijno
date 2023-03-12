import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import StatsPage from './pages/StatsPage';
import Arrays from './topics/Arrays';
import Matrix from './topics/Matrix';
import String from './topics/String';
import Searchandsort from './topics/Searchandsort';
import Privacypolicy from './pages/Privacypolicy';

ReactDOM.render(
  <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/arrays" element={<Arrays />} />
      <Route path="/matrix" element={<Matrix />} />
      <Route path="/string" element={<String />} />
      <Route path="/searchandsort" element={<Searchandsort/>} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/privacypolicy" element={<Privacypolicy />} />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
