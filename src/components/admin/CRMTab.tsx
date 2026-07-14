import { Trash2, AlertCircle } from 'lucide-react';
import { Lead } from '../../types';

interface Props {
  leads: Lead[];
  onUpdateStatus: (id: string, status: 'new' | 'contacted' | 'archived') => void;
  onDelete: (id: string) => void;
}

export default function CRMTab({ leads, onUpdateStatus, onDelete }: Props) {
  if (leads.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-sans font-black text-white">Frictionless Leads Center</h2>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">MANAGE PROSPECT PIPELINES</p>
          </div>
        </div>
        <div className="p-12 text-center rounded-2xl bg-neutral-900/20 border border-neutral-800/80 max-w-2xl text-neutral-500 font-sans text-xs space-y-2 mx-auto">
          <AlertCircle className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
          <p className="text-sm font-bold text-neutral-400">Pipeline is empty</p>
          <p>No leads yet. The contact form on the public site will populate this.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-sans font-black text-white">Frictionless Leads Center</h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">MANAGE PROSPECT PIPELINES, BOOKINGS, AND BRIEFS</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-neutral-500 uppercase">AUTOSAVE:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">READY</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Desktop table */}
        <div className="hidden md:block bg-neutral-900/20 border border-neutral-800 rounded-2xl overflow-hidden max-w-5xl shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs text-neutral-300">
              <thead>
                <tr className="bg-neutral-950 text-neutral-500 border-b border-neutral-800 font-mono text-[9px] uppercase tracking-widest">
                  <th className="p-4 font-bold">Contact</th>
                  <th className="p-4 font-bold">Budget</th>
                  <th className="p-4 font-bold">Project Brief</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 text-center font-bold">Delete</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id} className="border-b border-neutral-800/60 hover:bg-neutral-950/20 transition-colors">
                    <td className="p-4 space-y-1">
                      <p className="font-bold text-white text-sm">{lead.name}</p>
                      <a href={`mailto:${lead.email}`} className="text-indigo-400 hover:underline flex items-center gap-1">{lead.email}</a>
                      <p className="text-[9px] text-neutral-600 font-mono">{lead.timestamp}</p>
                    </td>
                    <td className="p-4 font-mono font-extrabold text-indigo-400">{lead.budget}</td>
                    <td className="p-4 max-w-xs leading-relaxed text-neutral-400">{lead.projectBrief}</td>
                    <td className="p-4">
                      <select value={lead.status} onChange={e => onUpdateStatus(lead.id, e.target.value as any)}
                        className="bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[10px] rounded px-2.5 py-1.5 focus:border-indigo-500/50 outline-none">
                        <option value="new">🆕 New</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="archived">📁 Archived</option>
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => onDelete(lead.id)} className="p-2 bg-neutral-950 border border-neutral-800 hover:border-red-500/25 text-neutral-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {leads.map(lead => (
            <div key={lead.id} className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-4">
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1 min-w-0">
                  <p className="font-bold text-white text-base truncate">{lead.name}</p>
                  <a href={`mailto:${lead.email}`} className="text-indigo-400 hover:underline text-xs block truncate">{lead.email}</a>
                  <p className="text-[9px] text-neutral-500 font-mono">{lead.timestamp}</p>
                </div>
                <button onClick={() => onDelete(lead.id)} className="p-2 bg-neutral-950 border border-neutral-800 text-neutral-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-neutral-900 font-sans text-xs">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">Budget</span>
                  <span className="font-mono font-extrabold text-indigo-400 text-xs">{lead.budget}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">Stage</span>
                  <select value={lead.status} onChange={e => onUpdateStatus(lead.id, e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[10px] rounded px-2 py-1 focus:border-indigo-500/50 outline-none mt-1">
                    <option value="new">🆕 New</option>
                    <option value="contacted">📞 Contact</option>
                    <option value="archived">📁 Archive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono text-neutral-500 uppercase block">Project Brief</span>
                <p className="text-xs text-neutral-400 leading-relaxed bg-neutral-950 p-3 rounded-xl border border-neutral-900/60">{lead.projectBrief}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
