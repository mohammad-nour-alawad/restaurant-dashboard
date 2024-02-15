
// src/App.tsx or your layout component
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SidebarComp from './components/SidebarComp';
import RevenuesDashboardComp from './components/RevenuesDashboardComp';
import AddOrderComp from './components/AddOrderComp';
import AddProductComp from './components/AddProductComp';
import DeleteProductComp from './components/DeleteProductComp';

// Import other components/pages

function App() {
  return (
    <Router>
      <div className="d-flex">
        <SidebarComp />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/revenues" element={<RevenuesDashboardComp />} />
            <Route path="/add-order" element={<AddOrderComp />} />
            <Route path="/add-product" element={<AddProductComp />} />
            <Route path="/delete-product" element={<DeleteProductComp />} />
            <Route path="*" element={<Navigate to="/revenues" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;