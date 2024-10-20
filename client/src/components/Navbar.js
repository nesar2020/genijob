import React from 'react';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">Geniune Jobs</div>
    <ul className="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/search">Search</a></li>
      <li><a href="add_post">Post a job</a></li>
    </ul>
    <button className="login-btn">Log in</button>
  </nav>
);
export default Navbar;
