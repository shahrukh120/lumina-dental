import React from 'react';

const TermsOfCare: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms of Care</h1>
        
        <div className="space-y-8 text-slate-600">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2">1. Appointments & Cancellations</h3>
            <p>
              We respect your time and ask that you respect ours. Please provide at least **24 hours notice** if you need to reschedule or cancel an appointment. Failure to do so may result in a cancellation fee. Late arrivals of more than 15 minutes may require rescheduling.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2">2. Payment Policy</h3>
            <p>
              Payment is due at the time of service. We accept cash, UPI, and major credit/debit cards. For extensive treatments (like implants or orthodontics), flexible payment plans may be arranged prior to the start of treatment.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2">3. Emergency Care</h3>
            <p>
              We prioritize patients of record for emergency care. While we strive to address emergencies immediately, wait times may vary depending on the severity of scheduled cases. Sunday services are strictly for emergencies only.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2">4. Treatment Guarantees</h3>
            <p>
              While we guarantee the quality of our materials and craftsmanship, medical outcomes can vary based on patient biology and home care. We cannot guarantee specific results but commit to addressing any post-operative complications professionally.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfCare;