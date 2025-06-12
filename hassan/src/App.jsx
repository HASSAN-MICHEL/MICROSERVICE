import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import ProductList from './components/Products/ProductList.jsx';
import ProductForm from './components/Products/ProductForm.jsx';
import SaleList from './components/Sales/SaleList.jsx';
import SaleForm from './components/Sales/SaleForm.jsx';
import DailyReport from './components/Reports/DailyReport.jsx';
import StockReport from './components/Reports/StockReport.jsx';
import AppLayout from './components/Layout/AppLayout.jsx';
import { useState } from 'react';
import DashboardPage from './pages/DashboardPage.jsx';
import User from './components/user.jsx';
import Settings from './pages/settings.jsx'
import Notifications from './pages/Notifications.jsx'

function App() {
 const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleCollapse = (forceClose = null) => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(forceClose === null ? !isSidebarOpen : forceClose);
    } else {
      setCollapsed(!collapsed);
    }
  };

 return (
<AppProvider>
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout
            collapsed={collapsed}
            toggleCollapse={toggleCollapse}
            isSidebarOpen={isSidebarOpen}
          />
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id/edit" element={<ProductForm />} />
        <Route path="sales" element={<SaleList />} />
        <Route path="sales/new" element={<SaleForm />} />
        <Route path="sales/:id" element={<SaleForm />} />
        <Route path="reports/daily" element={<DailyReport />} />
        <Route path="reports/stock" element={<StockReport />} />
        <Route path="users" element={<User />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  </Router>
</AppProvider>

  );
}

export default App;