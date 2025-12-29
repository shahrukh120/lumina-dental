import React, { useState, useEffect } from 'react';
import { Plus, Trash2, LogOut, ArrowLeft, Image as ImageIcon, X, Upload, LayoutGrid, Stethoscope } from 'lucide-react';

interface Item {
  _id: string;
  title: string;
  description?: string; // Only for services
  category?: string;    // Only for gallery
  image: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'gallery'>('services');
  const [items, setItems] = useState<Item[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Clinic'); // Default category
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch Data based on active tab
  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    const endpoint = activeTab === 'services' ? 'services' : 'gallery';
    try {
      const res = await fetch(`http://localhost:3001/api/${endpoint}`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const endpoint = activeTab === 'services' ? 'services' : 'gallery';

    const formData = new FormData();
    formData.append('title', title);
    if (activeTab === 'services') formData.append('description', description);
    if (activeTab === 'gallery') formData.append('category', category);
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await fetch(`http://localhost:3001/api/${endpoint}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        setIsAdding(false);
        setTitle('');
        setDescription('');
        setImageFile(null);
        fetchItems();
        alert(`${activeTab === 'services' ? 'Service' : 'Photo'} added!`);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this item?")) return;
    const endpoint = activeTab === 'services' ? 'services' : 'gallery';
    const token = localStorage.getItem('adminToken');
    
    await fetch(`http://localhost:3001/api/${endpoint}/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    fetchItems();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-2 transition-colors">
              <ArrowLeft size={16} /> Back to Website
            </button>
            <h1 className="text-4xl font-bold text-slate-900">Admin <span className="serif italic font-normal text-indigo-600">Console</span></h1>
          </div>
          
          <div className="flex gap-4">
            <button onClick={handleLogout} className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all">
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8 bg-white p-2 rounded-2xl w-fit shadow-sm border border-slate-100">
          <button 
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'services' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Stethoscope size={18} /> Services
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'gallery' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <LayoutGrid size={18} /> Gallery
          </button>
        </div>

        {/* Add Button */}
        <div className="flex justify-end mb-8">
            <button onClick={() => setIsAdding(true)} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg">
              <Plus size={20} /> Add New {activeTab === 'services' ? 'Service' : 'Photo'}
            </button>
        </div>

        {/* Grid Display */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 group relative">
              <button onClick={() => handleDelete(item._id)} className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-sm text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm z-10">
                <Trash2 size={18} />
              </button>
              
              <div className="h-48 rounded-[2rem] overflow-hidden mb-4 relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                {item.category && (
                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                    {item.category}
                  </span>
                )}
              </div>
              <div className="px-2 pb-2">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                {item.description && <p className="text-slate-500 text-sm line-clamp-2 mt-1">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Modal */}
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-slate-950/60">
            <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl relative">
              <button onClick={() => setIsAdding(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600"><X size={24} /></button>
              <h2 className="text-2xl font-bold mb-8 text-slate-900 capitalize">Add {activeTab} Item</h2>
              
              <form onSubmit={handleAdd} className="space-y-5">
                <input required placeholder="Title" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={title} onChange={e => setTitle(e.target.value)} />
                
                {activeTab === 'services' ? (
                  <textarea required placeholder="Description..." rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={description} onChange={e => setDescription(e.target.value)} />
                ) : (
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="Clinic">Clinic Environment</option>
                    <option value="Patients">Happy Patients</option>
                    <option value="Treatments">Treatments</option>
                    <option value="Working">Doctors Working</option>
                    <option value="Technology">Technology</option>
                  </select>
                )}
                
                <div className="relative">
                  <input type="file" accept="image/*" required onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 pl-12 outline-none focus:ring-2 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  <Upload size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                  Save to Database
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;