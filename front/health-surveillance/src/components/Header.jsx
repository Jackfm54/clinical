import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Health Surveillance</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
      </nav>
    </header>
  );
};

export default Header;
