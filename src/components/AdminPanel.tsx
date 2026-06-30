import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Eye, EyeOff, ShieldCheck, Database, Calendar, Smartphone, Mail, MessageSquare, Trash2, CheckCircle2, RefreshCw, LogOut, ChevronRight, User, Palette, IndianRupee, Clock, ArrowUpRight, Search, Check, Save } from 'lucide-react';
import { db, collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, onSnapshot } from '../firebase';
import { Lead } from '../types';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Save authentication state in sessionStorage so they don't have to log in on page refresh within the same session
  useEffect(() => {
    const authSession = sessionStorage.getItem('viraj_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Setup real-time listener when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError('');
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedLeads: Lead[] = [];
      querySnapshot.forEach((docSnap) => {
        fetchedLeads.push({ id: docSnap.id, ...docSnap.data() } as Lead);
      });
      setLeads(fetchedLeads);
      setIsLoading(false);
    }, (err: any) => {
      console.error('Error fetching leads:', err);
      setError(`Database Error: ${err.message || 'Could not load leads'}. Check console/config.`);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default secret passcode is viraj17 (or custom values)
    if (passcode === 'viraj17' || passcode === '7498' || passcode === '2009') {
      setIsAuthenticated(true);
      sessionStorage.setItem('viraj_auth', 'true');
      setError('');
    } else {
      setError('Incorrect passcode! Please enter the correct passcode.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('viraj_auth');
    setPasscode('');
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    setError('');
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedLeads: Lead[] = [];
      querySnapshot.forEach((docSnap) => {
        fetchedLeads.push({ id: docSnap.id, ...docSnap.data() } as Lead);
      });
      setLeads(fetchedLeads);
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      setError(`Database Error: ${err.message || 'Could not load leads'}. Check console/config.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const leadDocRef = doc(db, 'leads', leadId);
      await updateDoc(leadDocRef, { status: newStatus });
      setLeads(prev =>
        prev.map(lead => (lead.id === leadId ? { ...lead, status: newStatus as any } : lead))
      );
    } catch (err: any) {
      console.error('Error updating status:', err);
      alert('Status update failed: ' + err.message);
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    try {
      const leadDocRef = doc(db, 'leads', leadId);
      await updateDoc(leadDocRef, { adminNotes: tempNotes });
      setLeads(prev =>
        prev.map(lead => (lead.id === leadId ? { ...lead, adminNotes: tempNotes } : lead))
      );
      setEditingNotesId(null);
    } catch (err: any) {
      console.error('Error saving notes:', err);
      alert('Failed to save notes: ' + err.message);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteDoc(doc(db, 'leads', leadId));
      setLeads(prev => prev.filter(lead => lead.id !== leadId));
    } catch (err: any) {
      console.error('Error deleting lead:', err);
      alert('Lead deletion failed: ' + err.message);
    }
  };

  // Pre-filled WhatsApp direct chat link generator
  const getWhatsAppLink = (lead: Lead) => {
    const formattedPhone = lead.whatsapp.replace(/\D/g, '');
    const cleanPhone = formattedPhone.startsWith('91') ? formattedPhone : `91${formattedPhone}`;
    const text = `Hi ${lead.name}, I am Viraj Bakale from VIRAJ Ventures. I saw your request for a "${lead.projectType.toUpperCase().replace('_', ' ')}" project with a budget of ${lead.budget}. Main aapse call par discuss karna chahta hu!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  // Formatting timestamp dates beautifully
  const formatLeadDate = (createdAt: any) => {
    if (!createdAt) return 'N/A';
    const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm) ||
      lead.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div id="admin-panel-section" className="py-20 relative">
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-[#0b1329]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-blue to-purple-500" />
            
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-5 h-5 text-electric-blue animate-pulse" />
              </div>
              <h3 className="text-xl font-display font-extrabold text-white">
                Admin Panel Access
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                "Authorized access only. Log in with your secret admin passcode."
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg text-left">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2 text-left">
                <label className="text-xs font-semibold text-slate-300">Enter Admin Passcode</label>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Secret Passcode..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-electric-blue placeholder-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-electric-blue hover:bg-electric-blue-dark text-slate-950 text-xs font-bold rounded-xl transition-all cursor-pointer flex justify-center items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                Access Console
              </button>
            </form>
            
            <p className="text-[10px] text-slate-500 mt-6 text-center font-mono">
              VIRAJ_VENTURES // ADMIN_SYSTEM_V1.0
            </p>
          </div>
        ) : (
          
          /* ACTIVE SECURED ADMIN CONSOLE */
          <div className="space-y-6">
            
            {/* Header Dashboard Control */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0b1329]/70 border border-slate-800 p-6 rounded-3xl backdrop-blur-md">
              <div className="text-left">
                <span className="text-[10px] font-mono text-electric-blue font-bold tracking-widest uppercase">
                  VIRAJ VENTURES // SECURED OPERATIONS
                </span>
                <h2 className="text-2xl font-display font-extrabold text-white mt-1 flex items-center gap-2">
                  <Database className="w-6 h-6 text-electric-blue" />
                  Client Leads Dashboard
                </h2>
              </div>

              <div className="flex gap-2.5 self-stretch sm:self-auto">
                <button
                  type="button"
                  onClick={fetchLeads}
                  disabled={isLoading}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Lock Console
                </button>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0b1329]/40 border border-slate-800 p-4 rounded-2xl text-left">
                <p className="text-xs text-slate-400">Total Leads</p>
                <h4 className="text-2xl font-display font-bold text-white mt-1">{leads.length}</h4>
              </div>
              <div className="bg-[#0b1329]/40 border border-slate-800 p-4 rounded-2xl text-left">
                <p className="text-xs text-slate-400">New / Uncontacted</p>
                <h4 className="text-2xl font-display font-bold text-electric-blue mt-1">
                  {leads.filter(l => l.status === 'new' || !l.status).length}
                </h4>
              </div>
              <div className="bg-[#0b1329]/40 border border-slate-800 p-4 rounded-2xl text-left">
                <p className="text-xs text-slate-400">Active Discussion</p>
                <h4 className="text-2xl font-display font-bold text-purple-400 mt-1">
                  {leads.filter(l => l.status === 'contacted' || l.status === 'in_progress').length}
                </h4>
              </div>
              <div className="bg-[#0b1329]/40 border border-slate-800 p-4 rounded-2xl text-left">
                <p className="text-xs text-slate-400">Completed Projects</p>
                <h4 className="text-2xl font-display font-bold text-green-400 mt-1">
                  {leads.filter(l => l.status === 'completed').length}
                </h4>
              </div>
            </div>

            {/* Filters bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0b1329]/30 p-4 rounded-2xl border border-slate-850">
              {/* Search */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search client name or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-electric-blue"
                />
              </div>

              {/* Status filtering */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto overflow-x-auto">
                {['all', 'new', 'contacted', 'in_progress', 'completed', 'archived'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
                      statusFilter === status
                        ? 'bg-electric-blue/15 text-electric-blue border border-electric-blue/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {status === 'all' ? 'All' : status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table or Cards Layout */}
            <div className="bg-[#0b1329]/50 border border-slate-800 rounded-3xl overflow-hidden">
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-electric-blue animate-spin" />
                  <p className="text-xs text-slate-400 mt-3">Loading Leads Data...</p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="py-20 text-center text-slate-400 text-sm">
                  No leads found. Please check your filter or search query.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-[#0f172a]/80 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                        <th className="p-4 pl-6">Client Details</th>
                        <th className="p-4">Project Scope</th>
                        <th className="p-4">Brand Color Choice</th>
                        <th className="p-4">Budget & Deadline</th>
                        <th className="p-4">Private Admin Notes</th>
                        <th className="p-4">Status Update</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850/60">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors">
                          
                          {/* Col 1: Name, Email, Whatsapp, Date */}
                          <td className="p-4 pl-6 align-top max-w-xs">
                            <div className="font-display font-extrabold text-sm text-white flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-slate-500" />
                              {lead.name}
                            </div>
                            <div className="text-slate-400 mt-1 flex items-center gap-1">
                              <Smartphone className="w-3 h-3 text-slate-500" />
                              <span className="font-semibold select-all">{lead.whatsapp}</span>
                            </div>
                            {lead.email && (
                              <div className="text-slate-500 mt-0.5 flex items-center gap-1 truncate select-all">
                                <Mail className="w-3 h-3 text-slate-500" />
                                <span>{lead.email}</span>
                              </div>
                            )}
                            <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 font-mono">
                              <Calendar className="w-3 h-3 text-slate-600" />
                              <span>{formatLeadDate(lead.createdAt)}</span>
                            </div>
                          </td>

                          {/* Col 2: Project Type, Idea Description, Reference Link */}
                          <td className="p-4 align-top max-w-sm">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-slate-900 text-slate-300 border border-slate-800">
                              {lead.projectType === 'website' && '💻 Website'}
                              {lead.projectType === 'mobile_app' && '📱 Mobile App'}
                              {lead.projectType === 'ui_ux_branding' && '🎨 UI/UX Design'}
                              {lead.projectType === 'custom' && '⚙️ Custom Idea'}
                            </span>
                            <p className="text-slate-300 mt-2 leading-relaxed font-sans text-xs break-words">
                              {lead.description}
                            </p>
                            {lead.referenceLink && (
                              <a
                                href={lead.referenceLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-electric-blue hover:underline mt-2.5 break-all"
                              >
                                <ArrowUpRight className="w-3.5 h-3.5" />
                                Reference Link
                              </a>
                            )}
                          </td>

                          {/* Col 3: Brand Color */}
                          <td className="p-4 align-top">
                            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-900 w-fit">
                              <span
                                className="w-4 h-4 rounded-full border border-white/20 shadow-md shrink-0"
                                style={{ backgroundColor: lead.brandColor }}
                              />
                              <span className="font-mono text-[10px] text-slate-400 select-all font-bold">
                                {lead.brandColor}
                              </span>
                            </div>
                          </td>

                          {/* Col 4: Budget & Deadline */}
                          <td className="p-4 align-top font-mono">
                            <div className="text-slate-300 font-bold flex items-center gap-1 text-[11px]">
                              <IndianRupee className="w-3 h-3 text-amber-500" />
                              {lead.budget}
                            </div>
                            <div className="text-slate-500 text-[10px] mt-1.5 flex items-center gap-1 font-sans">
                              <Clock className="w-3.5 h-3.5 text-slate-600" />
                              Deadline: {lead.deadline}
                            </div>
                          </td>

                          {/* Col 5: Private Admin Notes */}
                          <td className="p-4 align-top max-w-xs">
                            {editingNotesId === lead.id ? (
                              <div className="space-y-2">
                                <textarea
                                  value={tempNotes}
                                  onChange={(e) => setTempNotes(e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2 rounded-lg resize-none focus:outline-none focus:border-electric-blue"
                                  rows={3}
                                  placeholder="Type personal progress notes..."
                                />
                                <div className="flex gap-1.5 justify-end">
                                  <button
                                    type="button"
                                    onClick={() => setEditingNotesId(null)}
                                    className="px-2 py-1 text-[10px] bg-slate-900 border border-slate-800 rounded text-slate-400"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleSaveNotes(lead.id!)}
                                    className="px-2 py-1 text-[10px] bg-electric-blue text-slate-950 rounded font-semibold flex items-center gap-0.5"
                                  >
                                    <Save className="w-3 h-3" />
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="group/notes relative">
                                <p className="text-slate-400 italic font-serif leading-relaxed pr-6 max-h-16 overflow-y-auto">
                                  {lead.adminNotes || "No notes added yet..."}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingNotesId(lead.id!);
                                    setTempNotes(lead.adminNotes || '');
                                  }}
                                  className="text-[10px] text-electric-blue hover:underline font-semibold mt-1.5 cursor-pointer block"
                                >
                                  📝 Edit Notes
                                </button>
                              </div>
                            )}
                          </td>

                          {/* Col 6: Status Picker */}
                          <td className="p-4 align-top">
                            <select
                              value={lead.status || 'new'}
                              onChange={(e) => handleStatusChange(lead.id!, e.target.value)}
                              className={`p-2 rounded-xl text-xs font-semibold focus:outline-none border ${
                                lead.status === 'new' || !lead.status
                                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                  : lead.status === 'contacted'
                                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                  : lead.status === 'in_progress'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                  : lead.status === 'completed'
                                  ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}
                            >
                              <option value="new">🔵 New Lead</option>
                              <option value="contacted">🟣 Contacted</option>
                              <option value="in_progress">🟠 In Progress</option>
                              <option value="completed">🟢 Completed</option>
                              <option value="archived">⚪ Archived</option>
                            </select>
                          </td>

                          {/* Col 7: Action Buttons (WhatsApp, Trash) */}
                          <td className="p-4 align-top text-right pr-6 space-x-1.5 whitespace-nowrap">
                            <a
                              href={getWhatsAppLink(lead)}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-extrabold rounded-xl transition-all"
                            >
                              💬 Chat
                            </a>
                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id!)}
                              className="p-2 bg-slate-950 hover:bg-red-500/10 text-slate-500 hover:text-red-400 border border-slate-850 rounded-xl transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
