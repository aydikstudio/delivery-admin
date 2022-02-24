import React from 'react';
import Navbar from './Navbar';
import SideNav from './SideNav';

export default function  HeaderComponent() {
  return (<div>
      <Navbar />
      {localStorage.getItem("user_token_admin") && <SideNav /> }
  </div>);
}
