import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, Briefcase, DollarSign, Send, CheckCircle2, ShieldCheck, Database, Eye, Trash2 } from 'lucide-react';
import { Lead } from '../types';

interface ContactFormProps {
  selectedService: string;
  onClearSelectedService: () => void;
  onLeadLogged?: () => void;
  authorName?: string;
}

export default function ContactForm({ selectedService, onClearSelectedService, onLeadLogged, authorName }: ContactFormProps) {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [budget, setBudget] = useState('₦3,000,000 - ₦5,000,000');
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // CRM Leads Admin Panel States
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [allLeads, setAllLeads] = useState<Lead[]>([]);

  // Pre-fill selected service in brief if available
  useEffect(() => {
    if (selectedService) {
      setBrief((prev) => {
        const prefix = `Hi ${authorName || 'your consultant'}, I am interested in your "${selectedService}" package. `;
        if (prev.includes(prefix)) return prev;
        return prefix + prev;
      });
      // Scroll to form smoothly
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedService, authorName]);

  // Load existing leads for CRM view
  const loadLeads = () => {
    const saved = localStorage.getItem('vance_captured_leads');
    if (saved) {
      try {
        setAllLeads(JSON.parse(saved));
      } catch (e) {
        setAllLeads([]);
      }
    } else {
      setAllLeads([]);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) tempErrors.name = 'Please provide your name.';
    if (!email.trim()) {
      tempErrors.email = 'Please provide an email address.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }
    if (!brief.trim()) tempErrors.brief = 'Please describe your project brief.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate elite network latency
    setTimeout(() => {
      const newLead: Lead = {
        id: `lead_${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        projectBrief: brief.trim(),
        budget,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'new'
      };

      // Persistence in localStorage
      const existingLeads = localStorage.getItem('vance_captured_leads');
      let leadsList: Lead[] = [];
      if (existingLeads) {
        try {
          leadsList = JSON.parse(existingLeads);
        } catch (err) {
          leadsList = [];
        }
      }
      leadsList.unshift(newLead);
      localStorage.setItem('vance_captured_leads', JSON.stringify(leadsList));

      setIsSubmitting(false);
      setIsSuccess(true);
      loadLeads(); // Refresh admin CRM
      onClearSelectedService(); // Clear the preselected service parent state
      if (onLeadLogged) {
        onLeadLogged();
      }
    }, 1200);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBrief('');
    setBudget('₦3,000,000 - ₦5,000,000');
    setIsSuccess(false);
    setErrors({});
  };

  const handleDeleteLead = (leadId: string) => {
    const updated = allLeads.filter(l => l.id !== leadId);
    localStorage.setItem('vance_captured_leads', JSON.stringify(updated));
    setAllLeads(updated);
  };

  const handleUpdateStatus = (leadId: string, status: 'new' | 'contacted' | 'archived') => {
    const updated = allLeads.map(l => l.id === leadId ? { ...l, status } : l);
    localStorage.setItem('vance_captured_leads', JSON.stringify(updated));
    setAllLeads(updated);
  };

  const budgetOptions = [
    '₦1.5M - ₦3M',
    '₦3M - ₦5M',
    '₦5M - ₦10M',
    '₦10M+'
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-neutral-950 relative overflow-hidden">
      {/* Immersive background highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800/80 w-fit mb-4">
            <span className="text-xs font-mono font-medium text-indigo-400 uppercase tracking-wider">
              Secure Your Slot
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white mb-4">
            Ready to scale your digital presence?
          </h2>
          <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-xl mx-auto">
            Book an exclusive CRO Audit & Design strategy call. No obligation, 100% focused on uncovering hidden revenue leaks.
          </p>
        </div>

        {/* Dynamic Service Alert Pill */}
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 mx-auto w-fit bg-indigo-950/40 border border-indigo-900/60 rounded-xl px-4 py-2.5 flex items-center space-x-3"
            id="service-prefill-pill"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <p className="text-xs font-sans text-neutral-300">
              Applying pre-filled package context: <span className="text-white font-extrabold">{selectedService}</span>
            </p>
            <button
              onClick={onClearSelectedService}
              className="text-[10px] font-mono font-bold text-neutral-500 hover:text-white transition-colors cursor-pointer"
            >
              [Clear]
            </button>
          </motion.div>
        )}

        {/* Center Container with Premium Gradient Border finish */}
        <div className="relative p-[1px] bg-gradient-to-r from-indigo-500/20 via-indigo-500/40 to-indigo-500/20 rounded-3xl shadow-2xl" id="contact-form-card">
          <div className="bg-neutral-900/90 rounded-[23px] p-8 md:p-12 relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                  id="lead-capture-form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="name-input" className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          id="name-input"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Julian Vance"
                          className={`w-full bg-neutral-950 border ${
                            errors.name ? 'border-red-500/50' : 'border-neutral-800 focus:border-indigo-500/50'
                          } text-white font-sans text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none transition-colors placeholder:text-neutral-600`}
                        />
                      </div>
                      {errors.name && <span className="text-red-500 text-[11px] font-sans">{errors.name}</span>}
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="email-input" className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                        Business Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          id="email-input"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="julian@company.com"
                          className={`w-full bg-neutral-950 border ${
                            errors.email ? 'border-red-500/50' : 'border-neutral-800 focus:border-indigo-500/50'
                          } text-white font-sans text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none transition-colors placeholder:text-neutral-600`}
                        />
                      </div>
                      {errors.email && <span className="text-red-500 text-[11px] font-sans">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Budget Selector - High-Converting Button Grid */}
                  <div className="flex flex-col space-y-3">
                    <label className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center">
                      <DollarSign className="w-3.5 h-3.5 mr-1" /> Project Budget
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3" id="budget-selectors">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudget(opt)}
                          className={`py-3.5 px-2 text-center rounded-xl font-sans text-xs font-semibold border transition-all cursor-pointer ${
                            budget === opt
                              ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-md shadow-indigo-500/5'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Brief Input */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="brief-input" className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center">
                      <Briefcase className="w-3.5 h-3.5 mr-1" /> Project Brief & Goals
                    </label>
                    <textarea
                      id="brief-input"
                      rows={4}
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      placeholder="Explain your goals, target metrics, or existing conversion roadblocks..."
                      className={`w-full bg-neutral-950 border ${
                        errors.brief ? 'border-red-500/50' : 'border-neutral-800 focus:border-indigo-500/50'
                      } text-white font-sans text-sm rounded-xl px-4 py-3.5 outline-none transition-colors placeholder:text-neutral-600 resize-none`}
                    />
                    {errors.brief && <span className="text-red-500 text-[11px] font-sans">{errors.brief}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-sans font-bold text-sm shadow-lg shadow-indigo-600/10 transition-all hover:shadow-indigo-600/30 active:scale-[0.99] cursor-pointer group"
                    id="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Optimizing parameters...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Submit Project Request
                        <Send className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </span>
                    )}
                  </button>

                  {/* Guarantee label */}
                  <div className="flex items-center justify-center space-x-2 pt-2 border-t border-neutral-950">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest text-center">
                      Your privacy is secure. {authorName || 'your consultant'} replies within 12 business hours.
                    </p>
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                  id="contact-success-state"
                >
                  <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-sans font-black text-white">
                      Request Dispatched Successfully!
                    </h3>
                    <p className="text-neutral-400 font-sans text-sm max-w-md mx-auto">
                      Thank you, <span className="text-white font-bold">{name}</span>! Your project brief has been securely cataloged. {authorName || 'your consultant'} will review the details and reach out to schedule your CRO assessment.
                    </p>
                  </div>

                  <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800 text-left max-w-sm w-full space-y-1.5 text-xs font-mono">
                    <p className="text-neutral-500">SAVED_LEAD_METADATA:</p>
                    <p className="text-neutral-300"><span className="text-indigo-400">NAME:</span> {name}</p>
                    <p className="text-neutral-300"><span className="text-indigo-400">EMAIL:</span> {email}</p>
                    <p className="text-neutral-300"><span className="text-indigo-400">BUDGET:</span> {budget}</p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center px-6 py-2.5 rounded-lg border border-neutral-800 hover:border-indigo-500/30 text-xs font-mono font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Lead CRM Switcher for Demonstrating Local Persistence */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <button
            onClick={() => {
              loadLeads();
              setShowAdminPanel(!showAdminPanel);
            }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-[10px] font-mono text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
            id="admin-crm-toggle"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{showAdminPanel ? "Hide Local CRM Panel" : "View Submitted Leads (Local CRM)"}</span>
            <Eye className="w-3.5 h-3.5" />
          </button>

          {/* CRM Panel */}
          <AnimatePresence>
            {showAdminPanel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full mt-6 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
                id="admin-crm-panel"
              >
                <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Local Lead Database (Demo)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[9px] font-mono text-indigo-400">
                    {allLeads.length} leads logged
                  </span>
                </div>

                {allLeads.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500 font-sans text-xs">
                    No leads captured yet. Submit the form above to see persistence in action!
                  </div>
                ) : (
                  <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                    <table className="w-full text-left border-collapse font-sans text-xs text-neutral-300">
                      <thead>
                        <tr className="bg-neutral-950 text-neutral-500 border-b border-neutral-800 font-mono text-[10px] uppercase">
                          <th className="p-4">Contact</th>
                          <th className="p-4">Budget</th>
                          <th className="p-4">Project Brief</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allLeads.map((lead) => (
                          <tr key={lead.id} className="border-b border-neutral-800/60 hover:bg-neutral-950/20 transition-colors">
                            <td className="p-4">
                              <p className="font-bold text-white">{lead.name}</p>
                              <p className="text-[10px] text-neutral-500">{lead.email}</p>
                              <p className="text-[9px] text-neutral-600 font-mono mt-0.5">{lead.timestamp}</p>
                            </td>
                            <td className="p-4 font-mono font-bold text-indigo-400">
                              {lead.budget}
                            </td>
                            <td className="p-4 max-w-xs">
                              <p className="line-clamp-2 text-neutral-400 leading-normal">{lead.projectBrief}</p>
                            </td>
                            <td className="p-4">
                              <select
                                value={lead.status}
                                onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                                className="bg-neutral-950 border border-neutral-800 text-neutral-400 font-mono text-[10px] rounded px-1.5 py-1"
                              >
                                <option value="new">🆕 New</option>
                                <option value="contacted">📞 Contacted</option>
                                <option value="archived">📁 Archived</option>
                              </select>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 hover:bg-neutral-950 text-neutral-500 hover:text-red-400 rounded transition-colors cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
