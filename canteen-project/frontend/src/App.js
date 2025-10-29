import React from 'react';
import Menu from './components/Menu';
import StaffDashboard from './components/StaffDashboard';

function App(){
  const role = new URLSearchParams(window.location.search).get('role') || 'student';
  return (
    <div className="container">
      <h1>Canteen Queue & Order Tracker</h1>
      {role === 'staff' ? <StaffDashboard /> : <Menu />}
    </div>
  )
}
export default App;
