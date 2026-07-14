import { TrendingUp, RefreshCw } from 'lucide-react';

interface Props {
  analytics: {
    totalViews: number; totalLeads: number; conversionRate: number;
    conversionDelta: number; potentialRevenue: number; funnelEfficiency: number;
  };
  onRefresh: () => void;
}

export default function AnalyticsTab({ analytics, onRefresh }: Props) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-sans font-black text-white">Conversion & Revenue Statistics</h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">REAL-TIME DATA HARVEST FROM CONVERTED LEADS</p>
        </div>
        <button onClick={onRefresh} className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-indigo-500/25 text-neutral-400 hover:text-white transition-colors cursor-pointer">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Total Cold Views</p>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl font-mono font-black text-white">{analytics.totalViews}</p>
            <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0">+12.4% MoM</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Captured Contacts</p>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl font-mono font-black text-indigo-400">{analytics.totalLeads}</p>
            <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0">+8.5% MoM</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Visitor Conversion Rate</p>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl font-mono font-black text-white">{analytics.conversionRate}%</p>
            <span className="text-[10px] font-mono font-semibold text-indigo-400 bg-indigo-500/5 px-1.5 py-0.5 rounded border border-indigo-500/10 shrink-0">±{analytics.conversionDelta}% Dev</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Pipeline Value</p>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl font-mono font-black text-emerald-400 truncate">₦{analytics.potentialRevenue.toLocaleString()}</p>
            <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10 shrink-0">Active</span>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 lg:p-8 rounded-2xl bg-neutral-900/20 border border-neutral-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400 shrink-0" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Conversion Funnel</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">EFFICIENCY: {analytics.funnelEfficiency}%</span>
        </div>
        <div className="space-y-4">
          {[
            { label: '1. Total Cold Traffic (Impressions)', pct: 100, val: analytics.totalViews, color: 'bg-indigo-950', textColor: 'text-white' },
            { label: '2. Highly Engaged (Portfolio)', pct: 42, val: (analytics.totalViews * 0.42).toFixed(0), color: 'bg-indigo-800', textColor: 'text-indigo-400' },
            { label: '3. Motivated Leads (CTA Started)', pct: 12, val: (analytics.totalViews * 0.12).toFixed(0), color: 'bg-indigo-600', textColor: 'text-indigo-400' },
            { label: '4. Clients Converted (Lead Logged)', pct: analytics.conversionRate, val: analytics.totalLeads, color: 'bg-emerald-500', textColor: 'text-emerald-400' },
          ].map(s => (
            <div key={s.label} className="space-y-2">
              <div className="flex justify-between gap-2 text-xs font-mono">
                <span className="text-neutral-400 truncate">{s.label}</span>
                <span className={`${s.textColor} shrink-0`}>{s.pct}% ({s.val})</span>
              </div>
              <div className="h-2 rounded-full bg-neutral-900 overflow-hidden">
                <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
