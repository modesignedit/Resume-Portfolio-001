import { useState } from 'react';
import { Save } from 'lucide-react';
import { AuthorSettings } from '../../types';
import MobileImageUpload from './MobileImageUpload';

interface Props {
  settings: AuthorSettings;
  savingField: string | null;
  onSave: (s: AuthorSettings) => void;
}

export default function HeroTab({ settings, savingField, onSave }: Props) {
  const [local, setLocal] = useState(settings);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-sans font-black text-white">Customize Above-the-Fold Messaging</h2>
        <p className="text-xs text-neutral-500 font-mono mt-0.5">FINE-TUNE CUSTOMER ACQUISITION HOOKS IN REAL-TIME</p>
      </div>

      <form onSubmit={e => { e.preventDefault(); onSave(local); }} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Author Name</label>
            <input type="text" value={local.name} onChange={e => setLocal({ ...local, name: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/40 transition-colors" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Professional Title</label>
            <input type="text" value={local.title} onChange={e => setLocal({ ...local, title: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/40 transition-colors" />
          </div>
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Hook Headline (H1)</label>
          <input type="text" value={local.headline} onChange={e => setLocal({ ...local, headline: e.target.value })}
            className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/40 transition-colors" />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Subheadline</label>
          <textarea rows={3} value={local.subheadline} onChange={e => setLocal({ ...local, subheadline: e.target.value })}
            className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3.5 outline-none focus:border-indigo-500/40 transition-colors resize-none" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Primary CTA</label>
            <input type="text" value={local.primaryCta} onChange={e => setLocal({ ...local, primaryCta: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/40 transition-colors" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Secondary CTA</label>
            <input type="text" value={local.secondaryCta} onChange={e => setLocal({ ...local, secondaryCta: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/40 transition-colors" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950/40 border border-neutral-800/60 space-y-4">
          <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">Social & Local Connections</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'location', label: 'Location', placeholder: 'Lagos, Nigeria (GMT+1)' },
              { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '2348030001122' },
              { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...' },
              { key: 'twitter', label: 'Twitter/X URL', placeholder: 'https://x.com/...' },
            ].map(f => (
              <div key={f.key} className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">{f.label}</label>
                <input type="text" value={(local as any)[f.key] || ''}
                  onChange={e => setLocal({ ...local, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors font-mono" />
              </div>
            ))}
          </div>
        </div>

        <MobileImageUpload id="settings-profileImage" value={local.profileImage} onChange={v => setLocal({ ...local, profileImage: v })} label="Profile Portrait Image" />
        <MobileImageUpload id="settings-heroGraphic" value={local.heroGraphic} onChange={v => setLocal({ ...local, heroGraphic: v })} label="Hero Graphic" />

        <button type="submit" disabled={savingField === 'settings'}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-sans font-bold text-xs shadow-lg transition-all cursor-pointer">
          {savingField === 'settings' ? 'Persisting...' : 'Save Settings'}
          <Save className="w-3.5 h-3.5 ml-1.5" />
        </button>
      </form>
    </div>
  );
}
