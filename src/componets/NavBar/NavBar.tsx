import React from 'react';
import "./NavBar.css"

export default function NavBar() {
  return (
    <div className='navBar-container'>
      <div className='navBar-buttons'>
        <a href='/' className='navBar-button'>Request</a>
        <a href='*' className='navBar-button'>Jobs</a>
        <a href='*' className='navBar-button'>Admin</a>
        <a href='*' className='navBar-button'>Reports</a>
      </div>
    </div>

  )
}