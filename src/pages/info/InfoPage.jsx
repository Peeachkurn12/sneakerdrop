import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';

export default function InfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('sneaker_products') || '[]');
    const found = existing.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id]);

  if (!product) return <div className="p-8 text-center text-gray-500">Product not found</div>;

  return (
    <div className="min-h-screen bg-[#faf9f8] flex flex-col justify-center max-w-lg mx-auto p-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg shadow-black/5 border border-gray-100 text-center relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#a03030]/5 rounded-bl-full -z-0"></div>

        <div className="w-16 h-16 bg-[#f4f3f0] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
          <Info className="w-8 h-8 text-[#a03030]" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2 relative z-10">
          A note from the seller
        </h1>
        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-8 relative z-10">
          About {product.title}
        </p>

        <div className="bg-[#f9f9f9] p-6 rounded-2xl mb-10 text-left relative z-10">
          <p className="text-gray-700 leading-relaxed italic border-l-4 border-[#a03030] pl-4">
            "{product.note || 'Welcome to our pop-up! Feel free to ask any questions.'}"
          </p>
        </div>

        <button 
          onClick={() => navigate(`/product/${id}`)}
          className="w-full bg-[#1a1a1a] hover:bg-black text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md relative z-10"
        >
          View Sneaker Details
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div>
  );
}
