import React from 'react';
import './LogOut.css';

const LogOut = (props) => (
  <button type="button" className="btn btn-dark btn-sm" id="logoutBtn" onClick={props.handleLogout}>Logout</button>
)

export default LogOut;