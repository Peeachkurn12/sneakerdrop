import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, QrCode, Heart, ChevronRight, PackageSearch } from 'lucide-react';

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('sneaker_products') || '[]');
    setProducts(existing.reverse()); 
  }, []);

  const totalLikes = products.reduce((sum, item) => sum + (item.likes || 0), 0);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 min-h-screen bg-[#faf9f8]">
      
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">My Inventory</h1>
          <p className="text-gray-500 font-medium">Manage your sneaker listings & QR codes</p>
        </div>
        
        <button 
          onClick={() => navigate('/seller/create')}
          className="bg-[#1a1a1a] hover:bg-black text-white font-medium px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Plus className="w-5 h-5" />
          Add New Sneaker
        </button>
      </header>

      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Total Items</span>
          <span className="text-3xl font-bold text-gray-900">{products.length}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <span className="text-xs font-bold tracking-widest text-[#a03030] uppercase mb-2">Total Engagement</span>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#a03030] fill-[#a03030]" />
            <span className="text-3xl font-bold text-gray-900">{totalLikes}</span>
          </div>
        </div>
      </div>

      <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6">Recent Listings</h2>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 flex flex-col items-center justify-center text-center">
          <PackageSearch className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">No sneakers yet!</h3>
          <p className="text-gray-500 mb-6 max-w-sm">Create your first product post to generate a custom QR Code for your showcase.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 group hover:border-gray-300 transition-colors">
              
              <div className="w-full sm:w-32 h-32 bg-[#f4f3f0] rounded-xl overflow-hidden flex-shrink-0">
                {product.image ? (
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No image</div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <p className="text-xs font-bold tracking-widest text-[#a03030] uppercase mb-1">{product.brand}</p>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.title}</h3>
                  <p className="text-gray-500 font-medium mt-1">฿{Number(product.price).toLocaleString()}</p>
                </div>
                
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <button 
                    onClick={() => navigate(`/qr/${product.id}`)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#f4f3f0] hover:bg-[#eae8e4] text-[#1a1a1a] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <QrCode className="w-4 h-4" />
                    QR Code
                  </button>
                  <button 
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="sm:w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
