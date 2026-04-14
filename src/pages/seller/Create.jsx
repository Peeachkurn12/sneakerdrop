import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ChevronLeft, Save } from 'lucide-react';

export default function SellerCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    price: '',
    description: '',
    note: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
         setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now().toString(); 
    const newProduct = { id, ...formData, createdAt: new Date().toISOString(), likes: 0 };
    
    const existing = JSON.parse(localStorage.getItem('sneaker_products') || '[]');
    
    try {
      localStorage.setItem('sneaker_products', JSON.stringify([...existing, newProduct]));
      alert('บันทึกสำเร็จ (Mock)');
      navigate('/seller/dashboard');
    } catch (err) {
      alert('บันทึกไม่สำเร็จ: ขนาดไฟล์รูปภาพใหญ่เกินไป กรุณาย่อขนาดรูปภาพก่อนอัปโหลด');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-12">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-200 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-3xl font-bold tracking-tight">List New Sneaker</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 tracking-wide">PRODUCT IMAGE</label>
          <div className="relative border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-[#f4f3f0] hover:bg-[#eae8e4] transition-colors group h-72 flex flex-col items-center justify-center cursor-pointer">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              required={!formData.image}
            />
            {formData.image ? (
              <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-gray-500 group-hover:text-[#a03030] transition-colors">
                <Upload className="w-8 h-8 mb-3" />
                <span className="text-sm font-medium">Click to upload image</span>
                <span className="text-xs mt-1 opacity-70">PNG, JPG up to 5MB</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 tracking-wide">MODEL NAME</label>
            <input 
              required type="text" name="title" value={formData.title} onChange={handleChange}
              placeholder="e.g. Jordan 1 Retro High"
              className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] border border-transparent focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a03030]/20 transition-all font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 tracking-wide">BRAND</label>
            <input 
              required type="text" name="brand" value={formData.brand} onChange={handleChange}
              placeholder="e.g. Nike"
              className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] border border-transparent focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a03030]/20 transition-all font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 tracking-wide">PRICE (฿)</label>
          <input 
            required type="number" name="price" value={formData.price} onChange={handleChange}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] border border-transparent focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a03030]/20 transition-all font-medium"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 tracking-wide">PRODUCT DESCRIPTION</label>
          <textarea 
            required name="description" value={formData.description} onChange={handleChange} rows="4"
            placeholder="Detail the condition, sizing, and authenticities..."
            className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] border border-transparent focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a03030]/20 transition-all resize-none"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 tracking-wide">SELLER NOTE <span className="text-gray-400 font-normal">(Shown on Info Page first)</span></label>
          <textarea 
            name="note" value={formData.note} onChange={handleChange} rows="2"
            placeholder="e.g. 'Welcome to our pop-up store, inspect the sole...'"
            className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] border border-transparent focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a03030]/20 transition-all resize-none"
          ></textarea>
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full bg-[#a03030] hover:bg-[#852525] text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
            <Save className="w-5 h-5" />
            Save & Generate QR
          </button>
        </div>

      </form>
    </div>
  );
}
