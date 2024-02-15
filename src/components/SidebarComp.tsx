import React from 'react';
import { NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const SidebarComp = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: "280px", height: "100vh"}}>
      <a href="/revenues" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">Admin Dashboard</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/revenues" className={({ isActive }) => isActive ? "nav-link link-dark active" : "nav-link link-dark"}>
            Revenues Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-order" className={({ isActive }) => isActive ? "nav-link link-dark active" : "nav-link link-dark"}>
            Add Order
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-product" className={({ isActive }) => isActive ? "nav-link link-dark active" : "nav-link link-dark"}>
            Add Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/delete-product" className={({ isActive }) => isActive ? "nav-link link-dark active" : "nav-link link-dark"}>
            Delete Product
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarComp;
