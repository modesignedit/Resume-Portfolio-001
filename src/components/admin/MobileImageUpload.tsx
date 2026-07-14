import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface Props {
  id: string;
  value: string;
  onChange: (v: string) => void;
  label: string;
}

export default function MobileImageUpload({ id, value, onChange, label }: Props) {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return alert('Please select an image file.');
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') onChange(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">{label}</label>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
        <div
          onDragEnter={e => { e.preventDefault(); setDragActive(true); }}
          onDragOver={e => e.preventDefault()}
          onDragLeave={() => setDragActive(false)}
          onDrop={e => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); }}
          className={`sm:col-span-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-5 text-center transition-all relative overflow-hidden group min-h-[140px] cursor-pointer ${dragActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-neutral-800 bg-neutral-900/10 hover:border-neutral-700 hover:bg-neutral-900/30'}`}
          onClick={() => document.getElementById(`file-input-${id}`)?.click()}
        >
          <input id={`file-input-${id}`} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          <div className="space-y-2.5 z-10 pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-center text-neutral-400 group-hover:text-indigo-400 mx-auto transition-colors">
              <ImageIcon className="w-4 h-4" />
            </div>
            <p className="text-xs font-sans font-bold text-neutral-200"><span className="text-indigo-400">Tap to select</span> or drag</p>
            <p className="text-[10px] font-mono text-neutral-500">Supports PNG, JPG, WEBP, SVG</p>
          </div>
        </div>
        <div className="sm:col-span-4 flex flex-col justify-between bg-neutral-900/20 border border-neutral-800 rounded-2xl p-3.5 space-y-3">
          <div className="space-y-1.5 flex-1 flex flex-col justify-center">
            <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">Preview</span>
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-900/60 flex items-center justify-center relative">
              {value ? (
                <>
                  <img src={value} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer-when-downgrade" />
                  {value.startsWith('data:') && <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-indigo-600 text-[8px] font-mono text-white">Base64</span>}
                </>
              ) : (
                <span className="text-[10px] font-sans text-neutral-600 italic">No image</span>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">Or paste URL</span>
            <input
              type="text"
              value={value.startsWith('data:') ? 'Local file uploaded' : value}
              placeholder="https://images.unsplash.com/..."
              onChange={e => { if (e.target.value !== 'Local file uploaded') onChange(e.target.value); }}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-[11px] rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500/40 transition-colors font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
