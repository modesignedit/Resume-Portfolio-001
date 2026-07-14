import { useState } from 'react';
import { PlusCircle, X, Trash2, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';
import MobileImageUpload from './MobileImageUpload';

interface Props {
  projects: Project[];
  onAdd: (p: Project) => void;
  onDelete: (id: string) => void;
}

export default function PortfolioTab({ projects, onAdd, onDelete }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [form, setForm] = useState<Partial<Project>>({
    title: '', description: '', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    techStack: [], metrics: '+15% Conversion Rate', metricLabel: 'Sales Lift', client: ''
  });

  const addTag = () => {
    if (techInput.trim() && !form.techStack?.includes(techInput.trim())) {
      setForm({ ...form, techStack: [...(form.techStack || []), techInput.trim()] });
      setTechInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.client) return;
    onAdd({
      id: `project_${Date.now()}`, title: form.title, description: form.description,
      imageUrl: form.imageUrl || '', techStack: form.techStack || [],
      metrics: form.metrics || '', metricLabel: form.metricLabel || '', client: form.client,
    });
    setForm({ title: '', description: '', imageUrl: '', techStack: [], metrics: '', metricLabel: '', client: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-sans font-black text-white">Resume Portfolio Showcases</h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">MANAGE COMPLETED WORKS AND METRIC LIFTS</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center p-2 sm:px-4 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-sans font-bold transition-colors cursor-pointer">
          <PlusCircle className="w-4 h-4 sm:mr-1.5" />
          <span className="hidden sm:inline">Add Case Study</span>
        </button>
      </div>

      {showForm && (
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 max-w-2xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">New Case Study</span>
            <button onClick={() => setShowForm(false)} className="text-neutral-500 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="ApexFlow redesign" required
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Client</label>
                <input type="text" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="ApexFlow Labs" required
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Metric Lift</label>
                <input type="text" value={form.metrics} onChange={e => setForm({ ...form, metrics: e.target.value })} placeholder="+42% Conversion Rate" required
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Metric Label</label>
                <input type="text" value={form.metricLabel} onChange={e => setForm({ ...form, metricLabel: e.target.value })} placeholder="User Engagement" required
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40" />
              </div>
            </div>
            <MobileImageUpload id="project-imageUrl" value={form.imageUrl || ''} onChange={v => setForm({ ...form, imageUrl: v })} label="Project Image" />
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Description</label>
              <textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the challenges and results..."
                required className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40 resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Tech Stack</label>
              <div className="flex items-center gap-2">
                <input type="text" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  placeholder="Next.js, Tailwind..." className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40" />
                <button type="button" onClick={addTag} className="px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono font-bold rounded-xl text-neutral-300 hover:text-white">Add</button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.techStack?.map(t => (
                  <span key={t} className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-900 text-[10px] font-mono text-neutral-400 border border-neutral-800/80 gap-1">
                    {t}
                    <button type="button" onClick={() => setForm({ ...form, techStack: form.techStack?.filter(x => x !== t) || [] })} className="text-neutral-600 hover:text-white"><X className="w-2.5 h-2.5" /></button>
                  </span>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer">
              Add Case Study <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
        {projects.map(p => (
          <div key={p.id} className="p-4 rounded-2xl bg-neutral-900/20 border border-neutral-800 flex flex-col space-y-3">
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-900">
              <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-mono text-indigo-400 font-bold">{p.client}</p>
                <h4 className="text-sm font-sans font-bold text-white mt-0.5 truncate">{p.title}</h4>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-mono font-black text-emerald-400">{p.metrics}</p>
                <p className="text-[8px] font-mono text-neutral-500 uppercase">{p.metricLabel}</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{p.description}</p>
            <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
              <div className="flex flex-wrap gap-1 min-w-0">
                {p.techStack.map(t => (
                  <span key={t} className="px-1.5 py-0.5 rounded text-[8px] font-mono text-neutral-500 bg-neutral-950 border border-neutral-900">{t}</span>
                ))}
              </div>
              <button onClick={() => onDelete(p.id)} className="p-1.5 bg-neutral-950 border border-neutral-900 hover:border-red-500/25 hover:bg-red-950/10 text-neutral-500 hover:text-red-400 rounded transition-colors cursor-pointer shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
