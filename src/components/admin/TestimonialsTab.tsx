import { useState } from 'react';
import { Plus, X, Trash2, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../../types';
import MobileImageUpload from './MobileImageUpload';

interface Props {
  testimonials: Testimonial[];
  onAdd: (t: Testimonial) => void;
  onDelete: (id: string) => void;
}

export default function TestimonialsTab({ testimonials, onAdd, onDelete }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Testimonial>>({
    quote: '', rating: 5, clientName: '', clientRole: '', clientCompany: '',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.quote || !form.clientName) return;
    onAdd({
      id: `testimonial_${Date.now()}`, quote: form.quote, rating: form.rating || 5,
      clientName: form.clientName, clientRole: form.clientRole || '', clientCompany: form.clientCompany || '',
      clientAvatar: form.clientAvatar || '',
    });
    setForm({ quote: '', rating: 5, clientName: '', clientRole: '', clientCompany: '', clientAvatar: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-sans font-black text-white">Verified Partner Testimonials</h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">MANAGE SOCIAL PROOF REVIEWS</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center p-2 sm:px-4 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-sans font-bold transition-colors cursor-pointer">
          <Plus className="w-4 h-4 sm:mr-1.5" />
          <span className="hidden sm:inline">Add Review</span>
        </button>
      </div>

      {showForm && (
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 max-w-2xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">New Testimonial</span>
            <button onClick={() => setShowForm(false)} className="text-neutral-500 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Client Name</label>
                <input type="text" value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} placeholder="Sarah Jenkins" required
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Role</label>
                <input type="text" value={form.clientRole} onChange={e => setForm({ ...form, clientRole: e.target.value })} placeholder="VP of Growth" required
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Company</label>
                <input type="text" value={form.clientCompany} onChange={e => setForm({ ...form, clientCompany: e.target.value })} placeholder="Acme Corp" required
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Rating</label>
                <select value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40">
                  <option value="5">★★★★★ (5)</option>
                  <option value="4">★★★★ (4)</option>
                  <option value="3">★★★ (3)</option>
                </select>
              </div>
            </div>
            <MobileImageUpload id="testimonial-avatar" value={form.clientAvatar || ''} onChange={v => setForm({ ...form, clientAvatar: v })} label="Client Avatar" />
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Quote</label>
              <textarea rows={3} value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} placeholder="Describe the results..." required
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40 resize-none" />
            </div>
            <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer">
              Add Review <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {testimonials.map(t => (
          <div key={t.id} className="p-5 rounded-2xl bg-neutral-900/20 border border-neutral-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-yellow-500 font-mono text-xs">{'★'.repeat(t.rating)}</span>
                <button onClick={() => onDelete(t.id)} className="p-1.5 bg-neutral-950 border border-neutral-800 hover:border-red-500/25 hover:bg-red-950/10 text-neutral-500 hover:text-red-400 rounded transition-colors cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-neutral-300 italic leading-relaxed">"{t.quote}"</p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-900/60">
              <img src={t.clientAvatar} alt={t.clientName} className="w-8 h-8 rounded-full object-cover shrink-0" referrerPolicy="no-referrer-when-downgrade" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{t.clientName}</p>
                <p className="text-[9px] font-mono text-neutral-500 truncate">{t.clientRole}, {t.clientCompany}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
