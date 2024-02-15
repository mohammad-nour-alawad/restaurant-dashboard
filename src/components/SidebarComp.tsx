import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlusSquare, FaTrash, FaProductHunt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SidebarCompProps {
  isNarrow: boolean;
}

const SidebarComp: React.FC<SidebarCompProps> = ({ isNarrow }) => {
  const sidebarStyle = {
    width: isNarrow ? "80px" : "200px",
    height: "100vh"
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ ...sidebarStyle }}>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/restaurant-dashboard" className={({ isActive }) => isActive ? "nav-link link-dark active" : "nav-link link-dark"} end>
            <FaHome style={{marginBottom: 5}}/> {isNarrow ? "" : "Dashboard"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/restaurant-dashboard/add-order" className={({ isActive }) => isActive ? "nav-link link-dark active" : "nav-link link-dark"}>
            <FaPlusSquare style={{marginBottom: 5}}/> {isNarrow ? "" : "Add Order"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/restaurant-dashboard/add-product" className={({ isActive }) => isActive ? "nav-link link-dark active" : "nav-link link-dark"}>
            <FaProductHunt style={{marginBottom: 5}}/> {isNarrow ? "" : "Add Product"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/restaurant-dashboard/delete-product" className={({ isActive }) => isActive ? "nav-link link-dark active" : "nav-link link-dark"}>
            <FaTrash style={{marginBottom: 5}}/> {isNarrow ? "" : "Delete Product"}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarComp;
