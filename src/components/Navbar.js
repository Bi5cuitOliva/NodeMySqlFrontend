import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevents the document click from closing the dropdown
    setDropdownOpen(!dropdownOpen);
  };

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownOpen && !event.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand custom-brand" href="http://localhost:3000/">Student System</a>
      <button className="navbar-toggler" type="button" onClick={toggleDropdown} data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse justify-content-center ${dropdownOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active mx-5">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item dropdown mx-2">
            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" onClick={() => setDropdownOpen(true)} aria-haspopup="true" aria-expanded="false">
              Student
            </Link>
            <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdownMenuLink">
              <Link className="dropdown-item" to="/add-student" onClick={() => setDropdownOpen(false)}>Add Student</Link>
              <Link className="dropdown-item" to="/view-students" onClick={() => setDropdownOpen(false)}>View All Students</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;