import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-8">Last Updated: January 1, 2026</p>
        
        <div className="space-y-6 text-slate-600">
          <p>
            Dental & Maxillofacial Clinic ("we", "our", or "us") is committed to protecting your privacy. This policy explains how we handle your personal and medical information.
          </p>

          <h3 className="text-lg font-bold text-slate-900 mt-8">Information We Collect</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal ID:</strong> Name, phone number, email address, and age.</li>
            <li><strong>Medical History:</strong> Past dental records, allergies, medications, and X-rays.</li>
            <li><strong>Digital Data:</strong> Information collected via our website contact forms and cookies.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-900 mt-8">How We Use Your Data</h3>
          <p>We use your information solely for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Providing accurate dental diagnosis and treatment.</li>
            <li>Scheduling and confirming appointments (via WhatsApp/Phone).</li>
            <li>Processing payments and billing.</li>
            <li>Legal compliance with medical record-keeping laws.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-900 mt-8">Data Security</h3>
          <p>
            Your records are stored in secure, encrypted digital databases and locked physical archives. We do not sell or share your data with third-party advertisers. Access is restricted to authorized medical staff only.
          </p>

          <h3 className="text-lg font-bold text-slate-900 mt-8">Contact Us</h3>
          <p>
            If you have questions about your data, please contact us at the clinic directly or email privacy@khanshahrukh00988@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;