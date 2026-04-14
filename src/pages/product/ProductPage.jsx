import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ChevronLeft } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('sneaker_products') || '[]');
    const found = existing.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id]);

  const handleLike = () => {
    if (liked) return;
    
    setLiked(true);
    setProduct(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));

    const existing = JSON.parse(localStorage.getItem('sneaker_products') || '[]');
    const updated = existing.map(p => {
      if (p.id === id) return { ...p, likes: (p.likes || 0) + 1 };
      return p;
    });
    localStorage.setItem('sneaker_products', JSON.stringify(updated));
  };

  if (!product) return <div className="p-8 text-center text-gray-500">Product not found</div>;

  return (
    <div className="min-h-screen bg-white max-w-2xl mx-auto pb-20">
      
      <div className="relative h-[60vh] bg-[#f4f3f0] overflow-hidden group">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-6 left-6 z-10 p-3 bg-white/80 backdrop-blur-md hover:bg-white rounded-full shadow-sm transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>

      <div className="p-6 md:p-10 -mt-8 relative z-20 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        
        <div className="flex justify-between items-start gap-4 mb-2">
          <div>
            <p className="text-sm font-bold tracking-widest text-[#a03030] uppercase mb-1">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{product.title}</h1>
          </div>
          
          <button 
            onClick={handleLike}
            className={`p-4 rounded-full flex flex-col items-center justify-center transition-all ${liked ? 'bg-[#a03030]/10 text-[#a03030]' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
            <span className="text-xs font-bold mt-1">{product.likes || 0}</span>
          </button>
        </div>

        <div className="text-2xl font-medium text-gray-600 mb-8 mt-2">
          ฿{Number(product.price).toLocaleString()}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">Description</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
            {product.description}
          </p>
        </div>

      </div>
    </div>
  );
}
