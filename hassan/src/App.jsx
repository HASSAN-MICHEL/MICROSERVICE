
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Navbar from './components/Layout/Navbar.jsx';
import Sidebar from './components/Layout/Sidebar.jsx';
import ProductList from './components/Products/ProductList.jsx';
import ProductForm from './components/Products/ProductForm.jsx';
import SaleList from './components/Sales/SaleList.jsx';
import SaleForm from './components/Sales/SaleForm.jsx';
import DailyReport from './components/Reports/DailyReport.jsx';
import StockReport from './components/Reports/StockReport.jsx';
import ReportPanel from './components/Reports/ReportPanel.jsx';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="d-flex flex-grow-1">
            <Sidebar />
            <main className="flex-grow-1 p-4 bg-light">
              <div className="container-fluid">
                <Routes>
                  <Route path="/products" element={<ProductList />} />

                  <Route path="/products/new" element={<ProductForm />} />
                  <Route path="/products/:id/edit" element={<ProductForm />} />
                  <Route path="/sales" element={<SaleList />} />
                  <Route path="/sales/new" element={<SaleForm />} />
                  <Route path="/sales/:id" element={<SaleForm />} />
                  <Route path="/reports" element={<ReportPanel />} />
                  <Route path="/reports/daily" element={<DailyReport />} />
                  <Route path="/reports/stock" element={<StockReport />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;


// import React from 'react';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AppProvider } from './context/AppContext.jsx';
// import ProductList from './components/Products/ProductList.jsx';
// import ProductForm from './components/Products/ProductForm.jsx';
// import SaleList from './components/Sales/SaleList.jsx';
// import SaleForm from './components/Sales/SaleForm.jsx';
// import SecretairePage from './components/secretariat.jsx';
// import DailyReport from './components/Reports/DailyReport.jsx';
// import StockReport from './components/Reports/StockReport.jsx';

// import ReportPanel from './components/Reports/ReportPanel.jsx';
// import Facture from './components/Facture/Facture.jsx'; // Importez le nouveau composant

// function App() {
//   return (
//     <AppProvider>
//       <Router>
//         <div className="d-flex flex-column min-vh-100">
//           <Navbar />
//           <div className="d-flex flex-grow-1">
//             <Sidebar />
//             <main className="flex-grow-1 p-4 bg-light">
//               <div className="container-fluid">
//                 <Routes>
//                   <Route path="/products" element={<ProductList />} />
//                    <Route path="/secretariat" element={< SecretairePage/>} />
//                   <Route path="/products/new" element={<ProductForm />} />
//                   <Route path="/products/:id/edit" element={<ProductForm />} />
//                   <Route path="/sales" element={<SaleList />} />
//                   <Route path="/sales/new" element={<SaleForm />} />
//                   <Route path="/sales/:id" element={<SaleForm />} />
//                   <Route path="/reports" element={<ReportPanel />} />
//                   <Route path="/reports/daily" element={<DailyReport />} />
//                   <Route path="/reports/stock" element={<StockReport />} />
//                   <Route path="/factures/:id" element={<Facture />} /> {/* Nouvelle route */}
//                 </Routes>
//               </div>
//             </main>
//           </div>
//         </div>
//       </Router>
//     </AppProvider>

//     );
// }

// export default App;



// import AppLayout from './components/Layout/AppLayout.jsx';
// import { useState } from 'react';

// function App() {
//  const [collapsed, setCollapsed] = useState(false);
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleCollapse = (forceClose = null) => {
//     if (window.innerWidth < 1024) {
//       setSidebarOpen(forceClose === null ? !isSidebarOpen : forceClose);
//     } else {
//       setCollapsed(!collapsed);
//     }
//   };

//  return (
// <AppProvider>
//   <Router>
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <AppLayout
//             collapsed={collapsed}
//             toggleCollapse={toggleCollapse}
//             isSidebarOpen={isSidebarOpen}
//           />
//         }
//       >
//         <Route path="products" element={<ProductList />} />
//         <Route path="products/new" element={<ProductForm />} />
//         <Route path="products/:id/edit" element={<ProductForm />} />
//         <Route path="sales" element={<SaleList />} />
//         <Route path="sales/new" element={<SaleForm />} />
//         <Route path="sales/:id" element={<SaleForm />} />
//         <Route path="reports/daily" element={<DailyReport />} />
//         <Route path="reports/stock" element={<StockReport />} />
//       </Route>
//     </Routes>
//   </Router>
// </AppProvider>

// // >>>>>>> 67ab220e62c810e6afeb3710f72de8c0078c873e
//   );
// }

// export default App;