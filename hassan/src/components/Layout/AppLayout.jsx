import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // for desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // for mobile

  const toggleCollapse = (forceClose = null) => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(forceClose === null ? !isSidebarOpen : forceClose);
    } else {
      setCollapsed(prev => !prev);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden p-2 h-full">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleCollapse} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto rounded-md bg-gray-100 h-full p-3 mt-[10px]">
          <Outlet />
        </main>
      </div>
      </div>
  );
};

export default AppLayout;
