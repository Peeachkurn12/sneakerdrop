import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import SellerCreate from './pages/seller/Create';
import SellerDashboard from './pages/seller/Dashboard';
import InfoPage from './pages/info/InfoPage';
import ProductPage from './pages/product/ProductPage';
import QrPage from './pages/qr/QrPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#faf9f8] text-[#1a1a1a] font-sans">
        <Routes>
          <Route path="/" element={<Navigate to="/seller/dashboard" replace />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/create" element={<SellerCreate />} />
          <Route path="/info/:id" element={<InfoPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/qr/:id" element={<QrPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
