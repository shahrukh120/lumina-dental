import React from 'react';
import API_BASE_URL from '../config';
interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  
  // Logic to handle Admin Verification
  const handleAdminLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const email = window.prompt("Enter Admin Email to access Dashboard:");
    
    if (!email) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        // Save the secure token to localStorage
        localStorage.setItem('adminToken', data.token);
        alert("Verification Successful. Welcome, Dr. Khan.");
        // Redirect to your admin management page
        window.location.href = '/admin-dashboard'; 
      } else {
        alert(data.message || "Unauthorized Access");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Dental & <span className="font-light text-slate-500">maxillofacial clinic</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['About', 'Services', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {item}
            </a>
          ))}

          {/* Specialized Admin Action */}
          <button
            onClick={handleAdminLogin}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Admin
          </button>
          
          <a 
            href="#contact"
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg inline-block"
          >
            Book Appointment
          </a>
        </div>
        
        <button className="md:hidden text-slate-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;