import React, { useState, useEffect, FormEvent, ChangeEvent, DragEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, LayoutDashboard, Settings, Layers, Briefcase, 
  MessageSquare, LogOut, Plus, Trash2, Save, Undo, Check, 
  TrendingUp, Sparkles, DollarSign, AlertCircle, RefreshCw,
  Eye, FileText, ChevronRight, X, Image as ImageIcon, PlusCircle, CheckCircle2, Menu
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

interface AdminPanelProps {
  onClose: () => void;
  onDataChanged: () => void; // Call parent to trigger re-renders in the main portfolio
}

type ActiveTab = 'analytics' | 'hero' | 'services' | 'portfolio' | 'testimonials' | 'crm';

interface MobileImageUploadProps {
  id: string;
  value: string;
  onChange: (newValue: string) => void;
  label: string;
}

function MobileImageUpload({ id, value, onChange, label }: MobileImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        onChange(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">
        {label}
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
        {/* Upload Visual Box / Drag & Drop Target Area */}
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`sm:col-span-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-5 text-center transition-all relative overflow-hidden group min-h-[140px] cursor-pointer ${
            dragActive 
              ? 'border-indigo-500 bg-indigo-500/5' 
              : 'border-neutral-800 bg-neutral-900/10 hover:border-neutral-700 hover:bg-neutral-900/30'
          }`}
          onClick={() => document.getElementById(`file-input-${id}`)?.click()}
        >
          <input
            id={`file-input-${id}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
          
          <div className="space-y-2.5 z-10 pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-center text-neutral-400 group-hover:text-indigo-400 mx-auto transition-colors">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-sans font-bold text-neutral-200">
                <span className="text-indigo-400 hover:text-indigo-300">Tap to select</span> or drag image here
              </p>
              <p className="text-[10px] font-mono text-neutral-500 mt-1">Supports PNG, JPG, WEBP, SVG</p>
            </div>
          </div>
        </div>

        {/* Visual Preview Card & Manual URL entry */}
        <div className="sm:col-span-4 flex flex-col justify-between bg-neutral-900/20 border border-neutral-800 rounded-2xl p-3.5 space-y-3">
          <div className="space-y-1.5 flex-1 flex flex-col justify-center">
            <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">Preview</span>
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-900/60 flex items-center justify-center relative">
              {value ? (
                <>
                  <img 
                    src={value} 
                    alt="Uploaded preview" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  {value.startsWith('data:') && (
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-indigo-600 text-[8px] font-mono text-white">
                      Base64 Local
                    </span>
                  )}
                </>
              ) : (
                <span className="text-[10px] font-sans text-neutral-600 italic">No image selected</span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">Or paste direct asset URL</span>
            <input
              id={id}
              type="text"
              value={value.startsWith('data:') ? 'Local file uploaded' : value}
              placeholder="https://images.unsplash.com/..."
              onChange={(e) => {
                if (e.target.value !== 'Local file uploaded') {
                  onChange(e.target.value);
                }
              }}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-[11px] rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500/40 transition-colors font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel({ onClose, onDataChanged }: AdminPanelProps) {
  // Auth state
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('analytics');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic state loaded from DB
  const [settings, setSettingsState] = useState<AuthorSettings>(getSettings());
  const [services, setServicesState] = useState<Service[]>(getServices());
  const [projects, setProjectsState] = useState<Project[]>(getProjects());
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(getTestimonials());
  const [leads, setLeadsState] = useState<Lead[]>(getLeads());
  const [analytics, setAnalytics] = useState(getAnalytics());

  // Edit forms states
  const [savingField, setSavingField] = useState<string | null>(null);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);

  // Elegant in-app feedback states
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const triggerConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
  ) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm: () => {
        onConfirm();
        setConfirmDialog(null);
      }
    });
  };

  // New Service form
  const [newService, setNewService] = useState<Partial<Service>>({
    title: '',
    description: '',
    iconName: 'Zap',
    outcomes: ['', '', ''],
    startingPrice: '₦2,500,000'
  });

  // New Project form
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    techStack: [],
    metrics: '+15% Conversion Rate',
    metricLabel: 'Sales Lift',
    client: ''
  });
  const [newProjectTechInput, setNewProjectTechInput] = useState('');

  // New Testimonial form
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    quote: '',
    rating: 5,
    clientName: '',
    clientRole: '',
    clientCompany: '',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  });

  // Verify auth on mount
  useEffect(() => {
    setAuthenticated(isLoggedIn());
  }, []);

  // Reload analytics when dynamic lists change
  const refreshLocalState = () => {
    setSettingsState(getSettings());
    setServicesState(getServices());
    setProjectsState(getProjects());
    setTestimonialsState(getTestimonials());
    setLeadsState(getLeads());
    setAnalytics(getAnalytics());
    onDataChanged();
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    setTimeout(() => {
      const success = authenticate(username, password);
      setAuthLoading(false);
      if (success) {
        setAuthenticated(true);
        refreshLocalState();
      } else {
        setAuthError('Invalid credentials. Check the helper card below.');
      }
    }, 700);
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
  };

  const handleResetToDefaults = () => {
    triggerConfirm(
      'Reset All Contents',
      'Are you sure you want to reset all resume, services, and portfolio case studies back to their original 2026 design defaults? This will overwrite your custom modifications.',
      () => {
        resetToDefaults();
        refreshLocalState();
        showToast('All contents reset to original design defaults successfully.', 'info');
      },
      'Reset All Data',
      'Cancel'
    );
  };

  // 1. Author Settings Save
  const handleSaveSettings = (e: FormEvent) => {
    e.preventDefault();
    setSavingField('settings');
    setTimeout(() => {
      saveSettings(settings);
      setSavingField(null);
      refreshLocalState();
      showToast('Hero messaging and portfolio branding updated live!', 'success');
    }, 600);
  };

  // 2. Services Management
  const handleAddService = (e: FormEvent) => {
    e.preventDefault();
    if (!newService.title || !newService.description) {
      showToast('Please specify a valid service package title and brief description.', 'error');
      return;
    }
    const current = getServices();
    const serviceToAdd: Service = {
      id: `service_${Date.now()}`,
      title: newService.title,
      description: newService.description,
      iconName: newService.iconName || 'Zap',
      outcomes: newService.outcomes?.filter(o => o.trim() !== '') || ['Improve conversion rate'],
      startingPrice: newService.startingPrice || '₦2,500,000'
    };

    const updated = [...current, serviceToAdd];
    saveServices(updated);
    setShowAddService(false);
    setNewService({
      title: '',
      description: '',
      iconName: 'Zap',
      outcomes: ['', '', ''],
      startingPrice: '₦2,500,000'
    });
    refreshLocalState();
    showToast('New expert service package listed live successfully!', 'success');
  };

  const handleDeleteService = (id: string) => {
    triggerConfirm(
      'Remove Service Package',
      'Are you sure you want to delete this expertise service package from your public offers grid?',
      () => {
        const updated = getServices().filter(s => s.id !== id);
        saveServices(updated);
        refreshLocalState();
        showToast('Service package unlisted.', 'info');
      },
      'Unlist Package'
    );
  };

  // 3. Projects Management
  const handleAddProject = (e: FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description || !newProject.client) {
      showToast('Please specify a title, description, and client brand name for this study.', 'error');
      return;
    }
    const current = getProjects();
    const projectToAdd: Project = {
      id: `project_${Date.now()}`,
      title: newProject.title,
      description: newProject.description,
      imageUrl: newProject.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      techStack: newProject.techStack || ['React', 'Tailwind'],
      metrics: newProject.metrics || '+20% Growth',
      metricLabel: newProject.metricLabel || 'Conversion Increase',
      client: newProject.client
    };

    const updated = [...current, projectToAdd];
    saveProjects(updated);
    setShowAddProject(false);
    setNewProject({
      title: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      techStack: [],
      metrics: '+20% Conversion Rate',
      metricLabel: 'Sales Lift',
      client: ''
    });
    setNewProjectTechInput('');
    refreshLocalState();
    showToast('New case study posted successfully!', 'success');
  };

  const handleDeleteProject = (id: string) => {
    triggerConfirm(
      'Delete Case Study',
      'Are you sure you want to purge this case study project from your live visual showcase?',
      () => {
        const updated = getProjects().filter(p => p.id !== id);
        saveProjects(updated);
        refreshLocalState();
        showToast('Portfolio case study deleted.', 'info');
      },
      'Purge Case Study'
    );
  };

  const handleAddTechTag = () => {
    if (newProjectTechInput.trim() && !newProject.techStack?.includes(newProjectTechInput.trim())) {
      setNewProject((prev) => ({
        ...prev,
        techStack: [...(prev.techStack || []), newProjectTechInput.trim()]
      }));
      setNewProjectTechInput('');
    }
  };

  const handleRemoveTechTag = (tag: string) => {
    setNewProject((prev) => ({
      ...prev,
      techStack: (prev.techStack || []).filter(t => t !== tag)
    }));
  };

  // 4. Testimonials Management
  const handleAddTestimonial = (e: FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.quote || !newTestimonial.clientName) {
      showToast('Please complete the client review quote and reference name.', 'error');
      return;
    }
    const current = getTestimonials();
    const testimonialToAdd: Testimonial = {
      id: `testimonial_${Date.now()}`,
      quote: newTestimonial.quote,
      rating: newTestimonial.rating || 5,
      clientName: newTestimonial.clientName,
      clientRole: newTestimonial.clientRole || 'Director',
      clientCompany: newTestimonial.clientCompany || 'Acme Corp',
      clientAvatar: newTestimonial.clientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };

    const updated = [...current, testimonialToAdd];
    saveTestimonials(updated);
    setShowAddTestimonial(false);
    setNewTestimonial({
      quote: '',
      rating: 5,
      clientName: '',
      clientRole: '',
      clientCompany: '',
      clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    });
    refreshLocalState();
    showToast('Verified social proof review incorporated live!', 'success');
  };

  const handleDeleteTestimonial = (id: string) => {
    triggerConfirm(
      'Remove Partner Testimonial',
      'Are you sure you want to delete this verified partner review from your landing page carousel?',
      () => {
        const updated = getTestimonials().filter(t => t.id !== id);
        saveTestimonials(updated);
        refreshLocalState();
        showToast('Partner review removed.', 'info');
      },
      'Remove Review'
    );
  };

  // 5. CRM Lead Status Toggles
  const handleUpdateLeadStatus = (id: string, status: 'new' | 'contacted' | 'archived') => {
    const updated = getLeads().map(l => l.id === id ? { ...l, status } : l);
    saveLeads(updated);
    refreshLocalState();
    showToast(`Lead status transitioned to "${status === 'new' ? 'New Opportunity' : status === 'contacted' ? 'Contact Established' : 'Archived Lead'}".`, 'success');
  };

  const handleDeleteLead = (id: string) => {
    triggerConfirm(
      'Delete CRM Lead Record',
      'Are you sure you want to permanently delete this prospective opportunity? This action cannot be undone.',
      () => {
        const updated = getLeads().filter(l => l.id !== id);
        saveLeads(updated);
        refreshLocalState();
        showToast('CRM opportunity purged.', 'info');
      },
      'Delete Lead'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950 flex flex-col" id="admin-master-pane">
      
      {/* 2026 Admin Header */}
      <header className="border-b border-neutral-900 bg-neutral-950 py-4 px-4 sm:px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {authenticated && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          )}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-sm sm:text-base shrink-0 shadow-lg shadow-indigo-500/20">
            A
          </div>
          <div>
      <span className="font-sans font-black text-xs sm:text-base tracking-tight text-white flex items-center gap-1.5">
        AUTHOR WORKSPACE <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[8px] font-mono font-normal tracking-widest text-indigo-400">v2.6</span>
      </span>
      <p className="hidden sm:block text-[9px] sm:text-[10px] text-neutral-500 font-mono uppercase tracking-wider line-clamp-1">PORTFOLIO & LEADS ENGINE</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {authenticated && (
            <button
              onClick={handleResetToDefaults}
              className="hidden lg:inline-flex items-center px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-red-500/30 text-[10px] font-mono text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Reset state to initial defaults"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Reset Defaults
            </button>
          )}

          {authenticated && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 rounded-xl bg-red-950/40 border border-red-900/40 hover:bg-red-900/30 hover:border-red-500/40 text-xs font-semibold text-red-400 transition-all cursor-pointer shrink-0"
              title="Secure Logout"
            >
              <LogOut className="w-3.5 h-3.5 sm:mr-1.5 shrink-0" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200 font-sans font-semibold text-xs transition-colors flex items-center cursor-pointer group shrink-0"
          >
            <Eye className="w-3.5 h-3.5 sm:mr-1.5 group-hover:text-indigo-400 shrink-0" />
            <span className="hidden sm:inline">Visitor View</span>
            <span className="inline sm:hidden">Exit</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* If NOT Authenticated: Gorgeous Glassmorphic Authentication screen */}
        <AnimatePresence mode="wait">
          {!authenticated ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center justify-center relative bg-neutral-950"
              id="admin-auth-stage"
            >
              {/* Background accent glow */}
              <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-md w-full bg-neutral-900/40 border border-neutral-800 p-8 md:p-10 rounded-3xl backdrop-blur-xl relative z-10 space-y-6 shadow-2xl">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-indigo-400 mx-auto mb-4">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-sans font-black text-white">Author Portal Verification</h2>
                  <p className="text-xs text-neutral-400">Unlock your lead console and resume edit dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="auth-username" className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Username</label>
                    <input
                      id="auth-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      required
                      className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 transition-colors placeholder:text-neutral-700 font-mono"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="auth-password" className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Security Code</label>
                    <input
                      id="auth-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 transition-colors placeholder:text-neutral-700 font-mono"
                    />
                  </div>

                  {authError && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-sans font-bold text-sm shadow-lg shadow-indigo-600/10 transition-all cursor-pointer"
                  >
                    {authLoading ? 'Verifying signature...' : 'Verify Identity Key'}
                  </button>
                </form>

                {/* Helper Credential Box */}
                <div className="bg-neutral-950 border border-neutral-800/80 p-4 rounded-xl space-y-2 text-left">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">Demo Access Credentials</span>
                  </div>
                  <p className="text-[11px] font-sans text-neutral-400 leading-normal">
                    Enter the standard real-time credentials below to access management functionalities:
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] text-neutral-300">
                    <p><span className="text-neutral-500">USER:</span> admin</p>
                    <p><span className="text-neutral-500">PASS:</span> password2026</p>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            
            // IF Authenticated: Beautiful Master Admin Dashboard Grid
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col md:flex-row overflow-hidden"
              id="admin-dashboard-layout"
            >
              
              {/* Sidebar navigation */}
              <aside className="hidden md:flex md:w-64 md:border-r border-neutral-900 bg-neutral-950 flex-col justify-between shrink-0">
                <div className="p-6 space-y-6">
                  
                  {/* Sidebar title */}
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Active Workspace</span>
                    <p className="text-xs font-sans font-bold text-white mt-1">{settings.name} Workspace</p>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-1">
                    
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer whitespace-nowrap w-full ${
                        activeTab === 'analytics'
                          ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Analytics & CRO</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('hero')}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer whitespace-nowrap w-full ${
                        activeTab === 'hero'
                          ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Hero Settings</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('services')}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer whitespace-nowrap w-full ${
                        activeTab === 'services'
                          ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span>Manage Services</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('portfolio')}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer whitespace-nowrap w-full ${
                        activeTab === 'portfolio'
                          ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Portfolio Items</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('testimonials')}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer whitespace-nowrap w-full ${
                        activeTab === 'testimonials'
                          ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Testimonials</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('crm')}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer whitespace-nowrap w-full ${
                        activeTab === 'crm'
                          ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>CRM Leads Hub</span>
                      </div>
                      {leads.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-indigo-500 text-[9px] font-mono text-white">
                          {leads.length}
                        </span>
                      )}
                    </button>

                  </nav>

                </div>

                {/* Sidebar footer status */}
                <div className="p-6 border-t border-neutral-900 bg-neutral-950 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">LIVE SESSION</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-[10px] font-mono text-neutral-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Exit
                  </button>
                </div>

              </aside>

              {/* Mobile Drawer Overlay */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-x-0 top-[73px] bottom-0 z-[60] bg-neutral-950/98 backdrop-blur-md border-t border-neutral-900 md:hidden flex flex-col justify-between overflow-y-auto"
                  >
                    <div className="p-6 space-y-6">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Active Workspace</span>
                        <p className="text-sm font-sans font-black text-white mt-1">{settings.name} Workspace</p>
                      </div>

                      <nav className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setActiveTab('analytics');
                            setMobileMenuOpen(false);
                          }}
                          className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-semibold font-sans transition-all cursor-pointer ${
                            activeTab === 'analytics'
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                              : 'bg-neutral-900/50 text-neutral-300 border border-neutral-800/60 hover:text-white'
                          }`}
                        >
                          <LayoutDashboard className="w-4.5 h-4.5" />
                          <span>Analytics & CRO</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveTab('hero');
                            setMobileMenuOpen(false);
                          }}
                          className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-semibold font-sans transition-all cursor-pointer ${
                            activeTab === 'hero'
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                              : 'bg-neutral-900/50 text-neutral-300 border border-neutral-800/60 hover:text-white'
                          }`}
                        >
                          <Settings className="w-4.5 h-4.5" />
                          <span>Hero Settings</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveTab('services');
                            setMobileMenuOpen(false);
                          }}
                          className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-semibold font-sans transition-all cursor-pointer ${
                            activeTab === 'services'
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                              : 'bg-neutral-900/50 text-neutral-300 border border-neutral-800/60 hover:text-white'
                          }`}
                        >
                          <Layers className="w-4.5 h-4.5" />
                          <span>Manage Services</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveTab('portfolio');
                            setMobileMenuOpen(false);
                          }}
                          className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-semibold font-sans transition-all cursor-pointer ${
                            activeTab === 'portfolio'
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                              : 'bg-neutral-900/50 text-neutral-300 border border-neutral-800/60 hover:text-white'
                          }`}
                        >
                          <Briefcase className="w-4.5 h-4.5" />
                          <span>Portfolio Items</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveTab('testimonials');
                            setMobileMenuOpen(false);
                          }}
                          className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-semibold font-sans transition-all cursor-pointer ${
                            activeTab === 'testimonials'
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                              : 'bg-neutral-900/50 text-neutral-300 border border-neutral-800/60 hover:text-white'
                          }`}
                        >
                          <MessageSquare className="w-4.5 h-4.5" />
                          <span>Testimonials</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveTab('crm');
                            setMobileMenuOpen(false);
                          }}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold font-sans transition-all cursor-pointer ${
                            activeTab === 'crm'
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                              : 'bg-neutral-900/50 text-neutral-300 border border-neutral-800/60 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4.5 h-4.5" />
                            <span>CRM Leads Hub</span>
                          </div>
                          {leads.length > 0 && (
                            <span className="px-2 py-0.5 rounded-md bg-indigo-500 text-xs font-mono text-white font-bold">
                              {leads.length}
                            </span>
                          )}
                        </button>
                      </nav>
                    </div>

                    <div className="p-6 border-t border-neutral-900 bg-neutral-950/80 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">LIVE SESSION</span>
                        </div>
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            handleResetToDefaults();
                          }}
                          className="text-[10px] font-mono text-neutral-400 hover:text-red-400 flex items-center gap-1.5 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Reset Defaults
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-red-950/40 border border-red-900/40 text-red-400 font-semibold text-xs hover:bg-red-900/30 transition-all cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out of Author Workspace</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Content Area */}
              <main className="flex-1 bg-neutral-950 overflow-y-auto p-4 sm:p-6 md:p-10 space-y-8 sm:space-y-10">
                
                {/* 1. ANALYTICS & CRO TAB */}
                {activeTab === 'analytics' && (
                  <div className="space-y-8" id="tab-analytics">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-sans font-black text-white">Conversion & Revenue Statistics</h2>
                        <p className="text-xs text-neutral-500 font-mono mt-0.5">REAL-TIME DATA HARVEST FROM CONVERTED LEADS</p>
                      </div>
                      <button 
                        onClick={() => refreshLocalState()}
                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-indigo-500/25 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        title="Recompute analytics parameters"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Stats Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      
                      {/* Views Card */}
                      <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Total Cold Views</p>
                        <div className="flex items-baseline justify-between">
                          <p className="text-2xl font-mono font-black text-white">{analytics.totalViews}</p>
                          <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">+12.4% MoM</span>
                        </div>
                      </div>

                      {/* Leads Captured Card */}
                      <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Captured Contacts</p>
                        <div className="flex items-baseline justify-between">
                          <p className="text-2xl font-mono font-black text-indigo-400">{analytics.totalLeads}</p>
                          <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">+8.5% MoM</span>
                        </div>
                      </div>

                      {/* Conversion Rate Card */}
                      <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Visitor Conversion Rate</p>
                        <div className="flex items-baseline justify-between">
                          <p className="text-2xl font-mono font-black text-white">{analytics.conversionRate}%</p>
                          <span className="text-[10px] font-mono font-semibold text-indigo-400 bg-indigo-500/5 px-1.5 py-0.5 rounded border border-indigo-500/10">±{analytics.conversionDelta}% Dev</span>
                        </div>
                      </div>

                      {/* Potential Pipeline Value */}
                      <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Pipeline Value</p>
                        <div className="flex items-baseline justify-between">
                          <p className="text-2xl font-mono font-black text-emerald-400">₦{analytics.potentialRevenue.toLocaleString()}</p>
                          <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">Active Funnel</span>
                        </div>
                      </div>

                    </div>

                    {/* Funnel Efficiency Chart Demo (Using structural styling) */}
                    <div className="p-6 md:p-8 rounded-2xl bg-neutral-900/20 border border-neutral-800 space-y-6">
                      <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-indigo-400" />
                          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Conversion Optimization Funnel</span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500">EFFICIENCY METRIC: {analytics.funnelEfficiency}%</span>
                      </div>

                      <div className="space-y-4">
                        {/* Stage 1 */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-neutral-400">1. Total Cold Traffic (Impressions)</span>
                            <span className="text-white">100% ({analytics.totalViews})</span>
                          </div>
                          <div className="h-2 rounded-full bg-neutral-900 overflow-hidden">
                            <div className="h-full bg-indigo-950 w-full rounded-full" />
                          </div>
                        </div>

                        {/* Stage 2 */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-neutral-400">2. Highly Engaged (Portfolio Visitors)</span>
                            <span className="text-indigo-400">42% ({(analytics.totalViews * 0.42).toFixed(0)})</span>
                          </div>
                          <div className="h-2 rounded-full bg-neutral-900 overflow-hidden">
                            <div className="h-full bg-indigo-800 w-[42%] rounded-full" />
                          </div>
                        </div>

                        {/* Stage 3 */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-neutral-400">3. Highly Motivated Leads (CTA Form Initiated)</span>
                            <span className="text-indigo-400">12% ({(analytics.totalViews * 0.12).toFixed(0)})</span>
                          </div>
                          <div className="h-2 rounded-full bg-neutral-900 overflow-hidden">
                            <div className="h-full bg-indigo-600 w-[12%] rounded-full" />
                          </div>
                        </div>

                        {/* Stage 4 */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-neutral-400">4. High-Ticket Clients Converted (Lead Logged)</span>
                            <span className="text-emerald-400">{analytics.conversionRate}% ({analytics.totalLeads})</span>
                          </div>
                          <div className="h-2 rounded-full bg-neutral-900 overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${analytics.conversionRate}%` }} />
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* 2. HERO SETTINGS TAB */}
                {activeTab === 'hero' && (
                  <div className="space-y-8" id="tab-hero">
                    <div>
                      <h2 className="text-xl font-sans font-black text-white">Customize Above-the-Fold Messaging</h2>
                      <p className="text-xs text-neutral-500 font-mono mt-0.5">FINE-TUNE CUSTOMER ACQUISITION HOOKS IN REAL-TIME</p>
                    </div>

                    <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="settings-name" className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Author Name</label>
                          <input
                            id="settings-name"
                            type="text"
                            value={settings.name}
                            onChange={(e) => setSettingsState({ ...settings, name: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/40 transition-colors"
                          />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="settings-title" className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Professional Title</label>
                          <input
                            id="settings-title"
                            type="text"
                            value={settings.title}
                            onChange={(e) => setSettingsState({ ...settings, title: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/40 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="settings-headline" className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Hook Headline (H1, Max 8 words recommended)</label>
                        <input
                          id="settings-headline"
                          type="text"
                          value={settings.headline}
                          onChange={(e) => setSettingsState({ ...settings, headline: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/40 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="settings-subheadline" className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Subheadline (Max 2 sentences recommended)</label>
                        <textarea
                          id="settings-subheadline"
                          rows={3}
                          value={settings.subheadline}
                          onChange={(e) => setSettingsState({ ...settings, subheadline: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3.5 outline-none focus:border-indigo-500/40 transition-colors resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="settings-primaryCta" className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Primary CTA label</label>
                          <input
                            id="settings-primaryCta"
                            type="text"
                            value={settings.primaryCta}
                            onChange={(e) => setSettingsState({ ...settings, primaryCta: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/40 transition-colors"
                          />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="settings-secondaryCta" className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Secondary CTA label</label>
                          <input
                            id="settings-secondaryCta"
                            type="text"
                            value={settings.secondaryCta}
                            onChange={(e) => setSettingsState({ ...settings, secondaryCta: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/40 transition-colors"
                          />
                        </div>
                      </div>

                      {/* West African Localized Master Professional Info Grid */}
                      <div className="p-4 rounded-2xl bg-neutral-950/40 border border-neutral-800/60 space-y-4">
                        <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">
                          ⚡ West African local business connections
                        </span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <label htmlFor="settings-location" className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Geographical Location</label>
                            <input
                              id="settings-location"
                              type="text"
                              value={settings.location || ''}
                              placeholder="Lagos, Nigeria (GMT+1)"
                              onChange={(e) => setSettingsState({ ...settings, location: e.target.value })}
                              className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors"
                            />
                          </div>

                          <div className="flex flex-col space-y-1.5">
                            <label htmlFor="settings-whatsapp" className="text-[10px] font-mono font-bold text-neutral-500 uppercase">WhatsApp Number (For Instant Deals)</label>
                            <input
                              id="settings-whatsapp"
                              type="text"
                              value={settings.whatsapp || ''}
                              placeholder="2348030001122"
                              onChange={(e) => setSettingsState({ ...settings, whatsapp: e.target.value })}
                              className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors font-mono"
                            />
                          </div>

                          <div className="flex flex-col space-y-1.5">
                            <label htmlFor="settings-linkedin" className="text-[10px] font-mono font-bold text-neutral-500 uppercase">LinkedIn Profile Link</label>
                            <input
                              id="settings-linkedin"
                              type="text"
                              value={settings.linkedin || ''}
                              placeholder="https://linkedin.com/in/username"
                              onChange={(e) => setSettingsState({ ...settings, linkedin: e.target.value })}
                              className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors"
                            />
                          </div>

                          <div className="flex flex-col space-y-1.5">
                            <label htmlFor="settings-twitter" className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Twitter/X Profile Link</label>
                            <input
                              id="settings-twitter"
                              type="text"
                              value={settings.twitter || ''}
                              placeholder="https://x.com/username"
                              onChange={(e) => setSettingsState({ ...settings, twitter: e.target.value })}
                              className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      <MobileImageUpload
                        id="settings-profileImage"
                        value={settings.profileImage}
                        onChange={(newValue) => setSettingsState({ ...settings, profileImage: newValue })}
                        label="Profile Portrait Image"
                      />

                      <MobileImageUpload
                        id="settings-heroGraphic"
                        value={settings.heroGraphic}
                        onChange={(newValue) => setSettingsState({ ...settings, heroGraphic: newValue })}
                        label="3D Mesh Sculpture Graphic"
                      />

                      <button
                        type="submit"
                        disabled={savingField === 'settings'}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-sans font-bold text-xs shadow-lg transition-all cursor-pointer"
                      >
                        {savingField === 'settings' ? 'Persisting changes...' : 'Save Settings Changes'}
                        <Save className="w-3.5 h-3.5 ml-1.5" />
                      </button>

                    </form>
                  </div>
                )}

                {/* 3. MANAGE SERVICES TAB */}
                {activeTab === 'services' && (
                  <div className="space-y-8" id="tab-services">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-sans font-black text-white">Expertise & Price Anchors</h2>
                        <p className="text-xs text-neutral-500 font-mono mt-0.5">ADD OR REMOVE HIGH-VALUED SERVICES TO YOUR CUSTOMER PATHWAY</p>
                      </div>
                      
                      <button
                        onClick={() => setShowAddService(!showAddService)}
                        className="inline-flex items-center p-2 sm:px-4 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-sans font-bold transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4 sm:mr-1.5" />
                        <span className="hidden sm:inline">Add Service Package</span>
                      </button>
                    </div>

                    {/* New Service Form Drawer */}
                    {showAddService && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 max-w-2xl space-y-6"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">New Package Builder</span>
                          <button onClick={() => setShowAddService(false)} className="text-neutral-500 hover:text-white">
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <form onSubmit={handleAddService} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1.5">
                              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Service Title</label>
                              <input
                                type="text"
                                value={newService.title}
                                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                                placeholder="CRO Audit & Redesign"
                                required
                                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40"
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Starting Price Anchor</label>
                              <input
                                type="text"
                                value={newService.startingPrice}
                                onChange={(e) => setNewService({ ...newService, startingPrice: e.target.value })}
                                placeholder="$4,500"
                                required
                                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col space-y-1.5">
                            <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Service Description</label>
                            <textarea
                              rows={2}
                              value={newService.description}
                              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                              placeholder="Describe how this service helps clients solve business bottlenecks..."
                              required
                              className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40 resize-none"
                            />
                          </div>

                          {/* Outcomes array fields */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Core Business Outcomes (Max 3)</label>
                            {[0, 1, 2].map((num) => (
                              <input
                                key={num}
                                type="text"
                                value={newService.outcomes?.[num] || ''}
                                onChange={(e) => {
                                  const list = [...(newService.outcomes || ['', '', ''])];
                                  list[num] = e.target.value;
                                  setNewService({ ...newService, outcomes: list });
                                }}
                                placeholder={`Outcome bullet ${num + 1} (e.g. Boost first-week engagement by 30%)`}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40"
                              />
                            ))}
                          </div>

                          <button
                            type="submit"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
                          >
                            Add Service Package
                            <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
                          </button>
                        </form>
                      </motion.div>
                    )}

                    {/* Current Services List */}
                    <div className="grid grid-cols-1 gap-4 max-w-3xl">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="p-5 rounded-2xl bg-neutral-900/20 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-900 text-[9px] font-mono text-indigo-400">
                                {service.startingPrice}
                              </span>
                              <h4 className="text-sm font-sans font-bold text-white">{service.title}</h4>
                            </div>
                            <p className="text-xs text-neutral-400 max-w-xl">{service.description}</p>
                            <p className="text-[9px] font-mono text-neutral-500">
                              Outcomes: {service.outcomes.join(' | ')}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-2 bg-neutral-950 border border-neutral-800 hover:border-red-500/30 hover:bg-red-950/20 text-neutral-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* 4. PORTFOLIO SHOWCASE ITEMS */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-8" id="tab-portfolio">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-sans font-black text-white">Resume Portfolio Showcases</h2>
                        <p className="text-xs text-neutral-500 font-mono mt-0.5">MANAGE COMPLETED WORKS AND ASSIGNED METRIC LIFT VALUE</p>
                      </div>

                      <button
                        onClick={() => setShowAddProject(!showAddProject)}
                        className="inline-flex items-center p-2 sm:px-4 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-sans font-bold transition-colors cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4 sm:mr-1.5" />
                        <span className="hidden sm:inline">Add Case Study</span>
                      </button>
                    </div>

                    {/* New Project Form Drawer */}
                    {showAddProject && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 max-w-2xl space-y-6"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">New Case Study Architect</span>
                          <button onClick={() => setShowAddProject(false)} className="text-neutral-500 hover:text-white">
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <form onSubmit={handleAddProject} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1.5">
                              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Project Title</label>
                              <input
                                type="text"
                                value={newProject.title}
                                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                placeholder="ApexFlow Enterprise redesign"
                                required
                                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40 font-sans"
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Client Brand Name</label>
                              <input
                                type="text"
                                value={newProject.client}
                                onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                                placeholder="ApexFlow Labs"
                                required
                                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40 font-sans"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1.5">
                              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Core Result Metric Lift</label>
                              <input
                                type="text"
                                value={newProject.metrics}
                                onChange={(e) => setNewProject({ ...newProject, metrics: e.target.value })}
                                placeholder="+42% Conversion Rate"
                                required
                                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40 font-mono"
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Metric Category Label</label>
                              <input
                                type="text"
                                value={newProject.metricLabel}
                                onChange={(e) => setNewProject({ ...newProject, metricLabel: e.target.value })}
                                placeholder="User Engagement"
                                required
                                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40 font-sans"
                              />
                            </div>
                          </div>

                          <MobileImageUpload
                            id="project-imageUrl"
                            value={newProject.imageUrl || ''}
                            onChange={(newValue) => setNewProject({ ...newProject, imageUrl: newValue })}
                            label="Project Mockup Image"
                          />

                          <div className="flex flex-col space-y-1.5">
                            <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Project Short Explainer</label>
                            <textarea
                              rows={2}
                              value={newProject.description}
                              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                              placeholder="Describe the challenges met and target results optimized..."
                              required
                              className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40 resize-none font-sans"
                            />
                          </div>

                          {/* Tech Tags Input */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Tech Stack tags</label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={newProjectTechInput}
                                onChange={(e) => setNewProjectTechInput(e.target.value)}
                                placeholder="Next.js, Tailwind, Recharts"
                                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40"
                              />
                              <button
                                type="button"
                                onClick={handleAddTechTag}
                                className="px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono font-bold rounded-xl text-neutral-300 hover:text-white"
                              >
                                Add Tag
                              </button>
                            </div>
                            
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {newProject.techStack?.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-900 text-[10px] font-mono text-neutral-400 border border-neutral-800/80 gap-1"
                                >
                                  {tag}
                                  <button type="button" onClick={() => handleRemoveTechTag(tag)} className="text-neutral-600 hover:text-white">
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
                          >
                            Build Case Study
                            <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
                          </button>
                        </form>
                      </motion.div>
                    )}

                    {/* Current Projects grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="p-4 rounded-2xl bg-neutral-900/20 border border-neutral-800 flex flex-col space-y-3"
                        >
                          <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-900">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>

                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[10px] font-mono text-indigo-400 font-bold">{project.client}</p>
                              <h4 className="text-sm font-sans font-bold text-white mt-0.5">{project.title}</h4>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-xs font-mono font-black text-emerald-400">{project.metrics}</p>
                              <p className="text-[8px] font-mono text-neutral-500 uppercase">{project.metricLabel}</p>
                            </div>
                          </div>

                          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{project.description}</p>

                          <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
                            <div className="flex flex-wrap gap-1">
                              {project.techStack.map(t => (
                                <span key={t} className="px-1.5 py-0.5 rounded text-[8px] font-mono text-neutral-500 bg-neutral-950 border border-neutral-900">{t}</span>
                              ))}
                            </div>

                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-1.5 bg-neutral-950 border border-neutral-900 hover:border-red-500/25 hover:bg-red-950/10 text-neutral-500 hover:text-red-400 rounded transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* 5. TESTIMONIALS TAB */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-8" id="tab-testimonials">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-sans font-black text-white">Verified Partner Testimonials</h2>
                        <p className="text-xs text-neutral-500 font-mono mt-0.5">MANAGE SOCIAL PROOF AND 5-STAR REVENUE VERIFICATIONS</p>
                      </div>

                      <button
                        onClick={() => setShowAddTestimonial(!showAddTestimonial)}
                        className="inline-flex items-center p-2 sm:px-4 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-sans font-bold transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4 sm:mr-1.5" />
                        <span className="hidden sm:inline">Add Review</span>
                      </button>
                    </div>

                    {/* New Testimonial Form drawer */}
                    {showAddTestimonial && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 max-w-2xl space-y-6"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">New Testimonial Form</span>
                          <button onClick={() => setShowAddTestimonial(false)} className="text-neutral-500 hover:text-white">
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <form onSubmit={handleAddTestimonial} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1.5">
                              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Client Name</label>
                              <input
                                type="text"
                                value={newTestimonial.clientName}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                                placeholder="Sarah Jenkins"
                                required
                                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40"
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Client Role & Role</label>
                              <input
                                type="text"
                                value={newTestimonial.clientRole}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, clientRole: e.target.value })}
                                placeholder="VP of Growth"
                                required
                                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1.5">
                              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Company Brand</label>
                              <input
                                type="text"
                                value={newTestimonial.clientCompany}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, clientCompany: e.target.value })}
                                placeholder="ApexFlow Labs"
                                required
                                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40"
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Rating Star Count (1 - 5)</label>
                              <select
                                value={newTestimonial.rating}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40"
                              >
                                <option value="5">★★★★★ (5 Stars)</option>
                                <option value="4">★★★★ (4 Stars)</option>
                                <option value="3">★★★ (3 Stars)</option>
                              </select>
                            </div>
                          </div>

                          <MobileImageUpload
                            id="testimonial-clientAvatar"
                            value={newTestimonial.clientAvatar || ''}
                            onChange={(newValue) => setNewTestimonial({ ...newTestimonial, clientAvatar: newValue })}
                            label="Client Avatar Image"
                          />

                          <div className="flex flex-col space-y-1.5">
                            <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Quote Review Text</label>
                            <textarea
                              rows={3}
                              value={newTestimonial.quote}
                              onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                              placeholder="Describe the exact metrics results or customer feedback..."
                              required
                              className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-indigo-500/40 resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
                          >
                            Incorporate Partner Review
                            <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
                          </button>
                        </form>
                      </motion.div>
                    )}

                    {/* Current list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                      {testimonials.map((test) => (
                        <div
                          key={test.id}
                          className="p-5 rounded-2xl bg-neutral-900/20 border border-neutral-800 flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-yellow-500 font-mono text-xs">
                                {'★'.repeat(test.rating)}
                              </span>
                              
                              <button
                                onClick={() => handleDeleteTestimonial(test.id)}
                                className="p-1.5 bg-neutral-950 border border-neutral-800 hover:border-red-500/25 hover:bg-red-950/10 text-neutral-500 hover:text-red-400 rounded transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-xs text-neutral-300 italic leading-relaxed">"{test.quote}"</p>
                          </div>

                          <div className="flex items-center space-x-3 pt-4 border-t border-neutral-900/60">
                            <img src={test.clientAvatar} alt={test.clientName} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                            <div>
                              <p className="text-xs font-bold text-white">{test.clientName}</p>
                              <p className="text-[9px] font-mono text-neutral-500">{test.clientRole}, {test.clientCompany}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* 6. CRM LEADS HUB TAB */}
                {activeTab === 'crm' && (
                  <div className="space-y-8" id="tab-crm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-sans font-black text-white">Frictionless Leads Center</h2>
                        <p className="text-xs text-neutral-500 font-mono mt-0.5">MANAGE PROSPECT PIPELINES, BOOKINGS, AND PROJECT BRIEFS</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase">AUTOSAVE ENGAGEMENT:</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">READY</span>
                      </div>
                    </div>

                    {leads.length === 0 ? (
                      <div className="p-12 text-center rounded-2xl bg-neutral-900/20 border border-neutral-800/80 max-w-2xl text-neutral-500 font-sans text-xs space-y-2">
                        <AlertCircle className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
                        <p className="text-sm font-bold text-neutral-400">Pipeline is empty</p>
                        <p className="max-w-xs mx-auto">No leads have submitted requests yet. Fill in the footer CTA capture form on the main Visitor View to register dynamic leads here!</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Desktop & Tablet Landscape View: High-Density CRM Table */}
                        <div className="hidden md:block bg-neutral-900/20 border border-neutral-800 rounded-2xl overflow-hidden max-w-5xl shadow-xl">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse font-sans text-xs text-neutral-300">
                              <thead>
                                <tr className="bg-neutral-950 text-neutral-500 border-b border-neutral-800 font-mono text-[9px] uppercase tracking-widest">
                                  <th className="p-4 font-bold">Contact Card</th>
                                  <th className="p-4 font-bold">Budget Frame</th>
                                  <th className="p-4 font-bold">Project Goals / Brief</th>
                                  <th className="p-4 font-bold">Stage Status</th>
                                  <th className="p-4 text-center font-bold">Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {leads.map((lead) => (
                                  <tr key={lead.id} className="border-b border-neutral-800/60 hover:bg-neutral-950/20 transition-colors">
                                    <td className="p-4 space-y-1">
                                      <p className="font-bold text-white text-sm">{lead.name}</p>
                                      <a href={`mailto:${lead.email}`} className="text-indigo-400 hover:underline flex items-center gap-1">
                                        {lead.email}
                                      </a>
                                      <p className="text-[9px] text-neutral-600 font-mono">{lead.timestamp}</p>
                                    </td>
                                    <td className="p-4 font-mono font-extrabold text-indigo-400">
                                      {lead.budget}
                                    </td>
                                    <td className="p-4 max-w-xs leading-relaxed text-neutral-400 font-sans">
                                      {lead.projectBrief}
                                    </td>
                                    <td className="p-4">
                                      <select
                                        value={lead.status}
                                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                                        className="bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[10px] rounded px-2.5 py-1.5 focus:border-indigo-500/50 outline-none"
                                      >
                                        <option value="new">🆕 New Opportunity</option>
                                        <option value="contacted">📞 Contact Established</option>
                                        <option value="archived">📁 Archived Lead</option>
                                      </select>
                                    </td>
                                    <td className="p-4 text-center">
                                      <button
                                        onClick={() => handleDeleteLead(lead.id)}
                                        className="p-2 bg-neutral-950 border border-neutral-800 hover:border-red-500/25 text-neutral-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                                        title="Delete opportunity"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Mobile & Portrait Tablet View: Modular Contact Cards Stack */}
                        <div className="md:hidden space-y-4">
                          {leads.map((lead) => (
                            <div
                              key={lead.id}
                              className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-4"
                            >
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <p className="font-bold text-white text-base">{lead.name}</p>
                                  <a href={`mailto:${lead.email}`} className="text-indigo-400 hover:underline text-xs block">
                                    {lead.email}
                                  </a>
                                  <p className="text-[9px] text-neutral-500 font-mono">{lead.timestamp}</p>
                                </div>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-2 bg-neutral-950 border border-neutral-800 text-neutral-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                                  title="Delete opportunity"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-neutral-900 font-sans text-xs">
                                <div>
                                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">Budget Frame</span>
                                  <span className="font-mono font-extrabold text-indigo-400 text-xs">{lead.budget}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">Workflow Stage</span>
                                  <div className="mt-1">
                                    <select
                                      value={lead.status}
                                      onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[10px] rounded px-2 py-1 focus:border-indigo-500/50 outline-none"
                                    >
                                      <option value="new">🆕 New</option>
                                      <option value="contacted">📞 Contact</option>
                                      <option value="archived">📁 Archive</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-neutral-500 uppercase block">Project Goals & Brief</span>
                                <p className="text-xs text-neutral-400 leading-relaxed bg-neutral-950 p-3 rounded-xl border border-neutral-900/60 font-sans">
                                  {lead.projectBrief}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </main>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Dynamic Animated Feedback Overlays */}
      <AnimatePresence>
        {confirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-2xl space-y-5"
            >
              <div className="flex items-start space-x-3.5">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                    {confirmDialog.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {confirmDialog.message}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  onClick={() => setConfirmDialog(null)}
                  className="px-4 py-2.5 text-xs font-semibold font-sans rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  {confirmDialog.cancelText || 'Cancel'}
                </button>
                <button
                  onClick={confirmDialog.onConfirm}
                  className="px-4 py-2.5 text-xs font-bold font-sans rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/10 cursor-pointer"
                >
                  {confirmDialog.confirmText || 'Confirm'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 z-[110] flex items-center space-x-2.5 px-4.5 py-3.5 rounded-2xl border bg-neutral-900 shadow-2xl sm:max-w-sm"
            style={{
              borderColor: toast.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : toast.type === 'info' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(16, 185, 129, 0.3)'
            }}
          >
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />}
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            
            <span className="text-xs font-sans font-medium text-neutral-200">
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
