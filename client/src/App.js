import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import JobDetailPage from './pages/JobDetailPage';


const App = () => (
  <Router>
    <Routes>
      <Route path="*" element={<Main />} />
      <Route path="api/jobs/:id" element={<JobDetailPage />} />
    </Routes>
  </Router>
);

export default App;
