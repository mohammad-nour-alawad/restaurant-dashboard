
// src/App.tsx or your layout component
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import SidebarComp from './components/SidebarComp';
import RevenuesDashboardComp from './components/RevenuesDashboardComp';
import AddOrderComp from './components/AddOrderComp';
import AddProductComp from './components/AddProductComp';
import DeleteProductComp from './components/DeleteProductComp';
import TopNavComp from './components/TopNavComp';

function App() {
  const [isSidebarNarrow, setIsSidebarNarrow] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarNarrow(window.innerWidth < 1080);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarNarrow(!isSidebarNarrow);
  };
  
  return (
    <Router>
      <TopNavComp toggleSidebar={toggleSidebar} isSidebarNarrow={isSidebarNarrow} />
      <div className="d-flex">
        <SidebarComp isNarrow={isSidebarNarrow} />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/restaurant-dashboard" element={<RevenuesDashboardComp />} />
            <Route path="/restaurant-dashboard/add-order" element={<AddOrderComp />} />
            <Route path="/restaurant-dashboard/add-product" element={<AddProductComp />} />
            <Route path="/restaurant-dashboard/delete-product" element={<DeleteProductComp />} />
            <Route path="*" element={<Navigate replace to="/restaurant-dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;