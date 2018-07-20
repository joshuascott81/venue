import React from 'react';

export default () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand small" href="#">
        Copyright &copy; {new Date().getFullYear()} Venue.Cool
      </a>
    </nav>
  );
};
