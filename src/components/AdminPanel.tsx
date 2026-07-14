import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, LayoutDashboard, Settings, Layers, Briefcase, 
  MessageSquare, FileText, LogOut, Plus, Save,
  Sparkles, AlertCircle, RefreshCw,
  Eye, CheckCircle2, X, Menu
} from 'lucide-react';
import { AuthorSettings, Service, Project, Testimonial, Lead } from '../types';
import { 
  getSettings, saveSettings, 
  getServices, saveServices, 
  getProjects, saveProjects, 
  getTestimonials, saveTestimonials, 
  getLeads, saveLeads, 
  authenticate, isLoggedIn, logout, 
  getAnalytics, resetToDefaults 
} from '../mock';
import AnalyticsTab from './admin/AnalyticsTab';
import HeroTab from './admin/HeroTab';
import ServicesTab from './admin/ServicesTab';
import PortfolioTab from './admin/PortfolioTab';
import TestimonialsTab from './admin/TestimonialsTab';
import CRMTab from './admin/CRMTab';

interface AdminPanelProps {
  onClose: () => void;
  onDataChanged: () => void;
}

type ActiveTab = 'analytics' | 'hero' | 'services' | 'portfolio' | 'testimonials' | 'crm';

const NAV_ITEMS: { key: ActiveTab; icon: typeof LayoutDashboard; label: string }[] = [
  { key: 'analytics', icon: LayoutDashboard, label: 'Analytics & CRO' },
  { key: 'hero', icon: Settings, label: 'Hero Settings' },
  { key: 'services', icon: Layers, label: 'Manage Services' },
  { key: 'portfolio', icon: Briefcase, label: 'Portfolio Items' },
  { key: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
  { key: 'crm', icon: FileText, label: 'CRM Leads Hub' },
];

export default function AdminPanel({ onClose, onDataChanged }: AdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('analytics');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [settings, setSettingsState] = useState<AuthorSettings>(getSettings());
  const [services, setServicesState] = useState<Service[]>(getServices());
  const [projects, setProjectsState] = useState<Project[]>(getProjects());
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(getTestimonials());
  const [leads, setLeadsState] = useState<Lead[]>(getLeads());
  const [analytics, setAnalytics] = useState(getAnalytics());

  const [savingField, setSavingField] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string; message: string; confirmText?: string; cancelText?: string; onConfirm: () => void;
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const triggerConfirm = (title: string, message: string, onConfirm: () => void, confirmText = 'Confirm', cancelText = 'Cancel') => {
    setConfirmDialog({ title, message, confirmText, cancelText, onConfirm: () => { onConfirm(); setConfirmDialog(null); } });
  };

  useEffect(() => { setAuthenticated(isLoggedIn()); }, []);

  const refreshLocalState = () => {
    setSettingsState(getSettings()); setServicesState(getServices()); setProjectsState(getProjects());
    setTestimonialsState(getTestimonials()); setLeadsState(getLeads()); setAnalytics(getAnalytics());
    onDataChanged();
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setAuthError(''); setAuthLoading(true);
    setTimeout(() => {
      const success = authenticate(username, password);
      setAuthLoading(false);
      if (success) { setAuthenticated(true); refreshLocalState(); }
      else setAuthError('Invalid credentials. Check the helper card below.');
    }, 700);
  };

  const handleLogout = () => { logout(); setAuthenticated(false); };
  const handleResetToDefaults = () => {
    triggerConfirm('Reset All Contents', 'Reset all data to 2026 defaults?', () => {
      resetToDefaults(); refreshLocalState(); showToast('Defaults restored.', 'info');
    }, 'Reset All', 'Cancel');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950 flex flex-col" id="admin-master-pane">
      <header className="border-b border-neutral-900 bg-neutral-950 py-4 px-6 md:px-12 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {authenticated && (
            <button onClick={() => setMobileMenuOpen(o => !o)}
              className="md:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0">
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          )}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-sm sm:text-base shrink-0 shadow-lg shadow-indigo-500/20">A</div>
          <div className="min-w-0">
            <span className="font-sans font-black text-xs sm:text-base tracking-tight text-white flex items-center gap-1.5">
              AUTHOR WORKSPACE <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[8px] font-mono font-normal tracking-widest text-indigo-400">v2.6</span>
            </span>
            <p className="hidden sm:block text-[9px] sm:text-[10px] text-neutral-500 font-mono uppercase tracking-wider truncate">PORTFOLIO & LEADS ENGINE</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {authenticated && (
            <button onClick={handleResetToDefaults}
              className="hidden lg:inline-flex items-center px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-red-500/30 text-[10px] font-mono text-neutral-400 hover:text-red-400 transition-colors cursor-pointer">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />Reset
            </button>
          )}
          {authenticated && (
            <button onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 rounded-xl bg-red-950/40 border border-red-900/40 hover:bg-red-900/30 hover:border-red-500/40 text-xs font-semibold text-red-400 transition-all cursor-pointer shrink-0">
              <LogOut className="w-3.5 h-3.5 sm:mr-1.5 shrink-0" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
          <button onClick={onClose}
            className="px-3 sm:px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200 font-sans font-semibold text-xs transition-colors flex items-center cursor-pointer group shrink-0">
            <Eye className="w-3.5 h-3.5 sm:mr-1.5 group-hover:text-indigo-400 shrink-0" />
            <span className="hidden sm:inline">Visitor View</span>
            <span className="inline sm:hidden">Exit</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {!authenticated ? (
            <motion.div key="auth" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
              className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center justify-center relative bg-neutral-950">
              <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="max-w-md w-full bg-neutral-900/40 border border-neutral-800 p-8 md:p-10 rounded-3xl backdrop-blur-xl relative z-10 space-y-6 shadow-2xl">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-indigo-400 mx-auto mb-4"><Lock className="w-5 h-5" /></div>
                  <h2 className="text-2xl font-sans font-black text-white">Author Portal</h2>
                  <p className="text-xs text-neutral-400">Unlock your lead console and resume editor</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" required
                      className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 transition-colors placeholder:text-neutral-700 font-mono" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                      className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 transition-colors placeholder:text-neutral-700 font-mono" />
                  </div>
                  {authError && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" /><span>{authError}</span></div>}
                  <button type="submit" disabled={authLoading}
                    className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-sans font-bold text-sm shadow-lg shadow-indigo-600/10 transition-all cursor-pointer">
                    {authLoading ? 'Verifying...' : 'Unlock Dashboard'}
                  </button>
                </form>
                <div className="bg-neutral-950 border border-neutral-800/80 p-4 rounded-xl space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">Admin Access</span>
                  </div>
                  <p className="text-[11px] font-sans text-neutral-400">Default credentials — change in <span className="font-mono text-neutral-300">src/mock.ts</span>:</p>
                  <div className="flex gap-4 pt-1 font-mono text-[10px] text-neutral-300">
                    <p><span className="text-neutral-500">USER:</span> admin</p>
                    <p><span className="text-neutral-500">PASS:</span> password2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex-1 flex flex-col md:flex-row overflow-hidden">

              {/* Desktop sidebar */}
              <aside className="hidden md:flex md:w-56 lg:w-64 md:border-r border-neutral-900 bg-neutral-950 flex-col justify-between shrink-0">
                <div className="p-6 space-y-6">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Workspace</span>
                    <p className="text-xs font-sans font-bold text-white mt-1 truncate">{settings.name}</p>
                  </div>
                  <nav className="flex flex-col gap-1">
                    {NAV_ITEMS.map(item => (
                      <button key={item.key} onClick={() => setActiveTab(item.key)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer w-full ${activeTab === item.key
                          ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                          : 'text-neutral-400 hover:text-white'}`}>
                        <item.icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Mobile drawer backdrop */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 top-[73px] z-[59] bg-black/60 md:hidden" onClick={() => setMobileMenuOpen(false)} />
                )}
              </AnimatePresence>

              {/* Mobile drawer */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div key="drawer" initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -300 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="fixed left-0 top-[73px] bottom-0 w-72 z-[60] bg-neutral-950/98 backdrop-blur-md border-r border-neutral-900 md:hidden flex flex-col justify-between overflow-y-auto shadow-2xl">
                    <div className="p-6 space-y-6">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Workspace</span>
                        <p className="text-sm font-sans font-black text-white mt-1 truncate">{settings.name}</p>
                      </div>
                      <nav className="flex flex-col gap-2">
                        {NAV_ITEMS.map(item => (
                          <button key={item.key} onClick={() => { setActiveTab(item.key); setMobileMenuOpen(false); }}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold font-sans transition-all cursor-pointer ${activeTab === item.key
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                              : 'bg-neutral-900/50 text-neutral-300 border border-neutral-800/60 hover:text-white'}`}>
                            <item.icon className="w-4.5 h-4.5 shrink-0" />
                            <span>{item.label}</span>
                            {item.key === 'crm' && leads.length > 0 && (
                              <span className="ml-auto px-2 py-0.5 rounded-md bg-indigo-500 text-xs font-mono text-white font-bold">{leads.length}</span>
                            )}
                          </button>
                        ))}
                      </nav>
                    </div>
                    <div className="p-6 border-t border-neutral-900 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">LIVE</span>
                        </div>
                        <button onClick={() => { setMobileMenuOpen(false); handleResetToDefaults(); }}
                          className="text-[10px] font-mono text-neutral-400 hover:text-red-400 flex items-center gap-1.5 cursor-pointer">
                          <RefreshCw className="w-3.5 h-3.5" />Reset
                        </button>
                      </div>
                      <button onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-950/40 border border-red-900/40 text-red-400 font-semibold text-xs hover:bg-red-900/30 transition-all cursor-pointer">
                        <LogOut className="w-4 h-4" />Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main content */}
              <main className="flex-1 bg-neutral-950 overflow-y-auto overflow-x-hidden px-6 py-4 sm:p-6 md:p-8 lg:p-10 space-y-8 sm:space-y-10 min-w-0">
                {activeTab === 'analytics' && <AnalyticsTab analytics={analytics} onRefresh={refreshLocalState} />}
                {activeTab === 'hero' && <HeroTab settings={settings} savingField={savingField} onSave={s => { setSavingField('settings'); setTimeout(() => { saveSettings(s); setSavingField(null); refreshLocalState(); showToast('Settings saved!'); }, 600); }} />}
                {activeTab === 'services' && <ServicesTab services={services} onAdd={s => { saveServices([...getServices(), s]); refreshLocalState(); showToast('Service added!'); }} onDelete={id => { triggerConfirm('Remove Service', 'Delete this service?', () => { saveServices(getServices().filter(x => x.id !== id)); refreshLocalState(); showToast('Service removed.'); }, 'Remove'); }} />}
                {activeTab === 'portfolio' && <PortfolioTab projects={projects} onAdd={p => { saveProjects([...getProjects(), p]); refreshLocalState(); showToast('Case study added!'); }} onDelete={id => { triggerConfirm('Delete Case Study', 'Delete this project?', () => { saveProjects(getProjects().filter(x => x.id !== id)); refreshLocalState(); showToast('Project deleted.'); }, 'Delete'); }} />}
                {activeTab === 'testimonials' && <TestimonialsTab testimonials={testimonials} onAdd={t => { saveTestimonials([...getTestimonials(), t]); refreshLocalState(); showToast('Review added!'); }} onDelete={id => { triggerConfirm('Remove Review', 'Delete this testimonial?', () => { saveTestimonials(getTestimonials().filter(x => x.id !== id)); refreshLocalState(); showToast('Review removed.'); }, 'Remove'); }} />}
                {activeTab === 'crm' && <CRMTab leads={leads} onUpdateStatus={(id, status) => { saveLeads(getLeads().map(l => l.id === id ? { ...l, status } : l)); refreshLocalState(); }} onDelete={id => { triggerConfirm('Delete Lead', 'Delete this lead permanently?', () => { saveLeads(getLeads().filter(x => x.id !== id)); refreshLocalState(); showToast('Lead deleted.'); }, 'Delete'); }} />}
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirm dialog */}
      <AnimatePresence>
        {confirmDialog && (
          <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
            <motion.div key="box" initial={{ scale: 0.95, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-2xl space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0"><AlertCircle className="w-5 h-5" /></div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">{confirmDialog.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{confirmDialog.message}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button onClick={() => setConfirmDialog(null)} className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer">{confirmDialog.cancelText || 'Cancel'}</button>
                <button onClick={confirmDialog.onConfirm} className="px-4 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/10 cursor-pointer">{confirmDialog.confirmText || 'Confirm'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div key="toast" initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 z-[110] flex items-center gap-2.5 px-4.5 py-3.5 rounded-2xl border bg-neutral-900 shadow-2xl sm:max-w-sm"
            style={{ borderColor: toast.type === 'error' ? 'rgba(239,68,68,0.3)' : toast.type === 'info' ? 'rgba(99,102,241,0.3)' : 'rgba(16,185,129,0.3)' }}>
            {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-red-400 shrink-0" /> : toast.type === 'info' ? <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            <span className="text-xs font-sans font-medium text-neutral-200">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
