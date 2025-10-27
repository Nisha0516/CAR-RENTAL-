import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;