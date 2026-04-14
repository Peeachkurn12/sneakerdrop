import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ChevronLeft, Download, Printer } from 'lucide-react';

export default function QrPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [scanUrl, setScanUrl] = useState('');

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('sneaker_products') || '[]');
    const found = existing.find(p => p.id === id);
    if (found) {
      setProduct(found);
      const baseUrl = window.location.origin + window.location.pathname;
      setScanUrl(`${baseUrl}#/info/${id}`);
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!product) return <div className="p-8 text-center text-gray-500">Product not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-12 min-h-[80vh] flex flex-col print:p-0">
      
      <header className="flex items-center gap-4 mb-8 print:hidden">
        <button onClick={() => navigate('/seller/dashboard')} className="p-2 -ml-2 hover:bg-gray-200 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-3xl font-bold tracking-tight">QR Code Display</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center bg-white p-10 rounded-2xl shadow-sm border border-gray-100 print:border-none print:shadow-none print:m-0">
        
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2">{product.brand}</h2>
          <h3 className="text-3xl font-bold text-gray-900">{product.title}</h3>
          <p className="text-[#a03030] font-semibold mt-2 text-xl">฿{Number(product.price).toLocaleString()}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
          <QRCodeSVG 
            value={scanUrl} 
            size={250}
            level={"H"}
            includeMargin={true}
          />
        </div>

        <p className="text-sm text-gray-500 mb-8 print:hidden">
          Scan to view details and seller notes
        </p>

        <div className="flex gap-4 print:hidden">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-[#f4f3f0] hover:bg-[#eae8e4] text-[#1a1a1a] font-medium rounded-xl transition-colors"
          >
            <Printer className="w-5 h-5" />
            Print QR Code
          </button>
          
          <button 
            onClick={() => navigate('/seller/create')}
            className="flex items-center gap-2 px-6 py-3 bg-[#a03030] hover:bg-[#852525] text-white font-medium rounded-xl transition-colors"
          >
            Add Another Item
          </button>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; margin: 0; padding: 0; }
        }
      `}} />
    </div>
  );
}
