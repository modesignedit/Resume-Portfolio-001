import { useState } from 'react';
import { Plus, X, Trash2, CheckCircle2 } from 'lucide-react';
import { Service } from '../../types';

interface Props {
  services: Service[];
  onAdd: (s: Service) => void;
  onDelete: (id: string) => void;
}

export default function ServicesTab({ services, onAdd, onDelete }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', iconName: 'Zap', outcomes: ['', '', ''], startingPrice: '₦2,500,000' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    onAdd({
      id: `service_${Date.now()}`, title: form.title, description: form.description,
      iconName: form.iconName, outcomes: form.outcomes.filter(o => o.trim()),
      startingPrice: form.startingPrice,
    });
    setForm({ title: '', description: '', iconName: 'Zap', outcomes: ['', '', ''], startingPrice: '₦2,500,000' });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-sans font-black text-white">Expertise & Price Anchors</h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">ADD OR REMOVE HIGH-VALUED SERVICES</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center p-2 sm:px-4 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-sans font-bold transition-colors cursor-pointer">
          <Plus className="w-4 h-4 sm:mr-1.5" />
          <span className="hidden sm:inline">Add Service</span>
        </button>
      </div>

      {showForm && (
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 max-w-2xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">New Package Builder</span>
            <button onClick={() => setShowForm(false)} className="text-neutral-500 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="CRO Audit & Redesign" required
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Price Anchor</label>
                <input type="text" value={form.startingPrice} onChange={e => setForm({ ...form, startingPrice: e.target.value })} placeholder="₦4,500,000" required
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40" />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Description</label>
              <textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe how this service helps..."
                required className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40 resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Outcomes (max 3)</label>
              {[0, 1, 2].map(n => (
                <input key={n} type="text" value={form.outcomes[n] || ''}
                  onChange={e => { const o = [...form.outcomes]; o[n] = e.target.value; setForm({ ...form, outcomes: o }); }}
                  placeholder={`Outcome ${n + 1}`}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40" />
              ))}
            </div>
            <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer">
              Add Service <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 max-w-3xl">
        {services.map(s => (
          <div key={s.id} className="p-5 rounded-2xl bg-neutral-900/20 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-900 text-[9px] font-mono text-indigo-400 shrink-0">{s.startingPrice}</span>
                <h4 className="text-sm font-sans font-bold text-white truncate">{s.title}</h4>
              </div>
              <p className="text-xs text-neutral-400 line-clamp-2">{s.description}</p>
              <p className="text-[9px] font-mono text-neutral-500 truncate">Outcomes: {s.outcomes.join(' | ')}</p>
            </div>
            <button onClick={() => onDelete(s.id)} className="p-2 bg-neutral-950 border border-neutral-800 hover:border-red-500/30 hover:bg-red-950/20 text-neutral-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer shrink-0 self-start sm:self-auto">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
