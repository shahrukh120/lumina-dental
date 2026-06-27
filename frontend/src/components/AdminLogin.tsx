import React, { useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, X, ShieldCheck, AlertCircle } from 'lucide-react';
import API_BASE_URL from '../config';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset the form whenever the modal is opened/closed
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setError('');
      setIsLoading(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !isLoading && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        window.location.href = '/admin-dashboard';
      } else {
        setError(data.message || 'Invalid email or password.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Could not connect to the server. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
      onMouseDown={(e) => {
        // Close when clicking the backdrop (but not while a request is in flight)
        if (e.target === e.currentTarget && !isLoading) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
        {/* Brand header band */}
        <div className="relative bg-linear-to-br from-indigo-900 to-indigo-600 px-8 pt-8 pb-12 text-center">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-5 right-5 text-white/70 hover:text-white disabled:opacity-40 transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <div className="mx-auto w-14 h-14 rounded-2xl bg-white/15 ring-1 ring-white/25 flex items-center justify-center backdrop-blur-sm">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <h2 className="serif text-2xl text-white mt-4 tracking-tight">Admin Access</h2>
          <p className="text-indigo-100/80 text-sm mt-1">
            <span className="font-semibold text-white">Maxo</span>Dent Dental Care Clinic
          </p>
        </div>

        {/* Form card pulled up over the band */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 -mt-6 relative">
          <div className="bg-white rounded-2xl shadow-[0_10px_40px_-12px_rgba(12,31,74,0.18)] border border-slate-100 p-6 space-y-4">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 text-red-700 text-sm rounded-xl px-4 py-3 border border-red-100">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  autoFocus
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-12 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 transition-all shadow-brand hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Verifying…
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5">
            <Lock size={12} /> Authorized personnel only
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
