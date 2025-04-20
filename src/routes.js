// src/routes/AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Data from './pages/data';
import Example from './pages/example';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/data" element={<Data />} />
      <Route path="/example" element={<Example />} />
    </Routes>
  );
}

export default AppRoutes;
