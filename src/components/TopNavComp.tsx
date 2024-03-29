import React from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';

interface TopNavCompProps {
  toggleSidebar: () => void;
  isSidebarNarrow: boolean;
}

const TopNavComp: React.FC<TopNavCompProps> = ({ toggleSidebar, isSidebarNarrow }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="btn ms-3" onClick={toggleSidebar}>
        {isSidebarNarrow ?  <FaBars size="1.5em" /> : <FaTimes size="1.5em" /> }
      </button>

      <div className="navbar-brand ms-auto">ADMIN</div>

      <div className="d-flex align-items-center">
        <FaUserCircle className="me-3" size="1.5em" />
      </div>
    </nav>
  );
};

export default TopNavComp;
