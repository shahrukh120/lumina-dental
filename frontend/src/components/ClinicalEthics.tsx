import React from 'react';
import { ShieldCheck, Heart, Scale, Microscope } from 'lucide-react';

const ClinicalEthics: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Clinical Ethics & <span className="text-indigo-600">Standards</span></h1>
        <p className="text-lg text-slate-600 mb-12 leading-relaxed">
          At Dental & Maxillofacial Clinic, our practice is founded on the core principles of bioethics: autonomy, non-maleficence, beneficence, and justice. Dr. Md S T Khan and his team adhere to the highest standards of the Indian Dental Association (IDA).
        </p>

        <div className="space-y-12">
          <section className="flex gap-6">
            <div className="shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sterilization & Safety</h3>
              <p className="text-slate-600 leading-relaxed">
                We follow strict **4-step sterilization protocols** for all instruments using Class B Autoclaves. Disposable barriers are used for every patient to prevent cross-contamination. Your safety is our non-negotiable priority.
              </p>
            </div>
          </section>

          <section className="flex gap-6">
            <div className="shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Scale size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Informed Consent</h3>
              <p className="text-slate-600 leading-relaxed">
                We believe in **transparent dentistry**. Before any procedure, you will be fully informed of the diagnosis, treatment options, potential risks, and costs. No treatment is performed without your explicit understanding and consent.
              </p>
            </div>
          </section>

          <section className="flex gap-6">
            <div className="shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Microscope size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Evidence-Based Practice</h3>
              <p className="text-slate-600 leading-relaxed">
                Dr. Md Suleman's treatment plans are based on current scientific literature and clinical expertise, not on trends. We only recommend treatments that are necessary for your oral health and well-being.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClinicalEthics;