import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio, type PortfolioDataType } from '../context/PortfolioContext';
import { EASE } from './fx';

type Tab = 'profile' | 'projects' | 'experience' | 'education' | 'skills' | 'achievements' | 'security';

export default function AdminModal() {
  const {
    data,
    saveData,
    resetData,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    login,
    logout,
    creds,
    updateCreds,
  } = usePortfolio();

  // Local draft state for editing before saving
  const [draft, setDraft] = useState<PortfolioDataType>(data);
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  // Security tab state
  const [newEmail, setNewEmail] = useState(creds.email);
  const [newPass, setNewPass] = useState(creds.pass);
  const [securityMessage, setSecurityMessage] = useState('');

  // Sync draft when data updates or modal opens
  React.useEffect(() => {
    if (isAdminOpen) {
      setDraft(data);
      setNewEmail(creds.email);
      setNewPass(creds.pass);
      setLoginError('');
      setSaveToast(false);
    }
  }, [isAdminOpen, data, creds]);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginEmail, loginPass);
    if (!success) {
      setLoginError('Invalid email or password. Please try again.');
    } else {
      setLoginError('');
    }
  };

  const handleSave = () => {
    saveData(draft);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      window.location.reload();
    }, 700);
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draft, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `portfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setDraft(parsed);
        saveData(parsed);
        alert('Data imported and applied successfully!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleSecuritySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newPass) return;
    updateCreds({ email: newEmail, pass: newPass });
    setSecurityMessage('Credentials updated successfully!');
    setTimeout(() => setSecurityMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6">
      <motion.div
        className="relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0f] text-bone shadow-[0_0_80px_rgba(0,0,0,0.9)]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-crimson/20 text-sm font-bold text-crimson-2">
              ⚙
            </span>
            <div>
              <h3 className="font-sans text-base font-bold text-bone">Nexus Admin Panel</h3>
              <p className="text-[11px] text-mist">
                {isAuthenticated ? `Logged in as ${creds.email}` : 'Sign in to customize your portfolio'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                type="button"
                onClick={logout}
                className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-smoke hover:border-white/30 hover:text-bone"
              >
                Log Out
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsAdminOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-bone hover:bg-white/20"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          /* Login View */
          <div className="flex flex-1 items-center justify-center p-6">
            <form
              onSubmit={handleLogin}
              className="w-full max-w-sm rounded-xl border border-white/10 bg-ink-2 p-6 shadow-xl"
            >
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-crimson text-xl font-bold text-white shadow-[0_0_30px_rgba(229,19,43,0.5)]">
                  R
                </div>
                <h4 className="text-lg font-bold text-bone">Admin Portal Login</h4>
                <p className="mt-1 text-xs text-mist">Enter credentials to edit your portfolio content</p>
              </div>

              {loginError && (
                <div className="mb-4 rounded-lg bg-red-500/15 p-2.5 text-center text-xs font-medium text-red-400">
                  {loginError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="w-full rounded-lg border border-white/15 bg-black/50 px-3 py-2.5 text-sm text-bone focus:border-crimson-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full rounded-lg border border-white/15 bg-black/50 px-3 py-2.5 text-sm text-bone focus:border-crimson-2 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-crimson py-2.5 text-sm font-bold text-white transition hover:bg-crimson-2"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
            {/* Sidebar Tabs */}
            <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-white/10 p-2 md:w-52 md:flex-col md:border-b-0 md:border-r md:p-3">
              {[
                { id: 'profile' as Tab, label: 'Profile & Hero', icon: '👤' },
                { id: 'projects' as Tab, label: 'Projects (Originals)', icon: '🎬' },
                { id: 'experience' as Tab, label: 'Experience & Agency', icon: '💼' },
                { id: 'education' as Tab, label: 'Education', icon: '🎓' },
                { id: 'skills' as Tab, label: 'Skills Universe', icon: '⚡' },
                { id: 'achievements' as Tab, label: 'Achievements', icon: '🏆' },
                { id: 'security' as Tab, label: 'Admin Security', icon: '🔒' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition ${
                    activeTab === t.id
                      ? 'bg-crimson text-white shadow-[0_0_20px_rgba(229,19,43,0.3)]'
                      : 'text-mist hover:bg-white/5 hover:text-bone'
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* TAB 1: Profile */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-crimson-2">Profile Details</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">Full Name</label>
                      <input
                        type="text"
                        value={draft.profile.fullName}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, fullName: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">Display Name</label>
                      <input
                        type="text"
                        value={draft.profile.displayName}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, displayName: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">First Name (Hero Title)</label>
                      <input
                        type="text"
                        value={draft.profile.firstName}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, firstName: e.target.value.toUpperCase() },
                          })
                        }
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">Series Tagline Subtitle</label>
                      <input
                        type="text"
                        value={draft.profile.seriesTag}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, seriesTag: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">Original Studio Label</label>
                      <input
                        type="text"
                        value={draft.profile.originalLabel}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, originalLabel: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">Professional Role</label>
                      <input
                        type="text"
                        value={draft.profile.role}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, role: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-smoke">
                      Taglines (separated by comma)
                    </label>
                    <input
                      type="text"
                      value={draft.profile.tagline.join(', ')}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          profile: {
                            ...draft.profile,
                            tagline: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                      className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-smoke">Intro / Bio</label>
                    <textarea
                      rows={3}
                      value={draft.profile.intro}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          profile: { ...draft.profile, intro: e.target.value },
                        })
                      }
                      className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">Location</label>
                      <input
                        type="text"
                        value={draft.profile.location}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, location: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">Email Address</label>
                      <input
                        type="email"
                        value={draft.profile.email}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, email: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">LinkedIn URL</label>
                      <input
                        type="text"
                        value={draft.profile.links.linkedin}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: {
                              ...draft.profile,
                              links: { ...draft.profile.links, linkedin: e.target.value },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">GitHub URL</label>
                      <input
                        type="text"
                        value={draft.profile.links.github}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: {
                              ...draft.profile,
                              links: { ...draft.profile.links, github: e.target.value },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                     <div className="sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <label className="mb-1 block text-xs font-medium text-smoke">Resume PDF (Path or Upload File)</label>
                        <button
                          type="button"
                          onClick={() =>
                            setDraft({
                              ...draft,
                              profile: { ...draft.profile, resumePdf: '/assets/Rutvek_Ladhi_Resume.pdf' },
                            })
                          }
                          className="text-[11px] font-semibold text-crimson-2 underline hover:text-white"
                        >
                          Use Rutvek_Ladhi_Resume.pdf
                        </button>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <input
                          type="text"
                          value={draft.profile.resumePdf}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              profile: { ...draft.profile, resumePdf: e.target.value },
                            })
                          }
                          placeholder="/assets/Rutvek_Ladhi_Resume.pdf or https://..."
                          className="flex-1 rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                        />
                        <label className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-bone hover:border-crimson-2 hover:bg-crimson/20">
                          <span>📎 Upload .PDF</span>
                          <input
                            type="file"
                            accept="application/pdf,.pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === 'string') {
                                  setDraft({
                                    ...draft,
                                    profile: { ...draft.profile, resumePdf: reader.result },
                                  });
                                }
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                      </div>
                      <p className="mt-1 text-[11px] text-smoke">
                        💡 टीप: ब्राउझर सुरक्षेमुळे <code className="text-bone">C:\Users\...</code> असा थेट path चालत नाही. तुम्ही वरील <b>Upload .PDF</b> बटणावर क्लिक करून थेट फाईल निवडू शकता किंवा <code className="text-bone">/assets/Rutvek_Ladhi_Resume.pdf</code> ठेवू शकता.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Projects */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-crimson-2">
                      Originals / Projects ({draft.projects.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newP = {
                          id: `project-${Date.now()}`,
                          title: 'New Project',
                          year: '2025',
                          genre: 'Full-Stack',
                          logline: 'Short project summary',
                          stack: ['React', 'Node.js'],
                          build: ['Implemented core architecture'],
                          features: ['Responsive UI'],
                          metrics: [{ value: '100%', label: 'Complete' }],
                          palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
                          motif: 'flow' as const,
                        };
                        setDraft({ ...draft, projects: [...draft.projects, newP] });
                      }}
                      className="rounded-lg bg-crimson px-3 py-1.5 text-xs font-bold text-white hover:bg-crimson-2"
                    >
                      + Add New Project
                    </button>
                  </div>

                  {draft.projects.map((p, idx) => (
                    <div key={p.id} className="rounded-xl border border-white/10 bg-ink-2 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-display text-lg text-bone">
                          {idx + 1}. {p.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setDraft({
                              ...draft,
                              projects: draft.projects.filter((_, i) => i !== idx),
                            });
                          }}
                          className="text-xs font-semibold text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Title</label>
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Genre / Category</label>
                          <input
                            type="text"
                            value={p.genre}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx] = { ...updated[idx], genre: e.target.value };
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Year</label>
                          <input
                            type="text"
                            value={p.year}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx] = { ...updated[idx], year: e.target.value };
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="mb-1 block text-[11px] text-smoke">Logline (Description)</label>
                        <input
                          type="text"
                          value={p.logline}
                          onChange={(e) => {
                            const updated = [...draft.projects];
                            updated[idx] = { ...updated[idx], logline: e.target.value };
                            setDraft({ ...draft, projects: updated });
                          }}
                          className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                        />
                      </div>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Tech Stack (comma separated)</label>
                          <input
                            type="text"
                            value={p.stack.join(', ')}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx] = {
                                ...updated[idx],
                                stack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              };
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">GitHub Link (optional)</label>
                          <input
                            type="text"
                            value={p.github || ''}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx] = { ...updated[idx], github: e.target.value };
                              setDraft({ ...draft, projects: updated });
                            }}
                            placeholder="https://github.com/..."
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: Experience */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-crimson-2">
                      Experience & Agency ({draft.experience.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newExp = {
                          company: 'New Company',
                          role: 'Developer',
                          place: 'Location',
                          period: '2025 – Present',
                          points: ['Core responsibilities'],
                        };
                        setDraft({ ...draft, experience: [...draft.experience, newExp] });
                      }}
                      className="rounded-lg bg-crimson px-3 py-1.5 text-xs font-bold text-white hover:bg-crimson-2"
                    >
                      + Add Experience
                    </button>
                  </div>

                  {draft.experience.map((x, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-ink-2 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-sans text-sm font-bold text-bone">
                          {x.role} — {x.company}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setDraft({
                              ...draft,
                              experience: draft.experience.filter((_, i) => i !== idx),
                            });
                          }}
                          className="text-xs font-semibold text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Company / Agency</label>
                          <input
                            type="text"
                            value={x.company}
                            onChange={(e) => {
                              const updated = [...draft.experience];
                              updated[idx] = { ...updated[idx], company: e.target.value };
                              setDraft({ ...draft, experience: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Role</label>
                          <input
                            type="text"
                            value={x.role}
                            onChange={(e) => {
                              const updated = [...draft.experience];
                              updated[idx] = { ...updated[idx], role: e.target.value };
                              setDraft({ ...draft, experience: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Period</label>
                          <input
                            type="text"
                            value={x.period}
                            onChange={(e) => {
                              const updated = [...draft.experience];
                              updated[idx] = { ...updated[idx], period: e.target.value };
                              setDraft({ ...draft, experience: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="mb-1 block text-[11px] text-smoke">
                          Bullet Points (one per line)
                        </label>
                        <textarea
                          rows={3}
                          value={x.points.join('\n')}
                          onChange={(e) => {
                            const updated = [...draft.experience];
                            updated[idx] = {
                              ...updated[idx],
                              points: e.target.value.split('\n').filter((s) => s.trim()),
                            };
                            setDraft({ ...draft, experience: updated });
                          }}
                          className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: Education */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-crimson-2">Education</h4>
                  {draft.education.map((e, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-ink-2 p-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">School / University</label>
                          <input
                            type="text"
                            value={e.school}
                            onChange={(ev) => {
                              const updated = [...draft.education];
                              updated[idx] = { ...updated[idx], school: ev.target.value };
                              setDraft({ ...draft, education: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Location</label>
                          <input
                            type="text"
                            value={e.place}
                            onChange={(ev) => {
                              const updated = [...draft.education];
                              updated[idx] = { ...updated[idx], place: ev.target.value };
                              setDraft({ ...draft, education: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Degree / Program</label>
                          <input
                            type="text"
                            value={e.degree}
                            onChange={(ev) => {
                              const updated = [...draft.education];
                              updated[idx] = { ...updated[idx], degree: ev.target.value };
                              setDraft({ ...draft, education: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Period / Year</label>
                          <input
                            type="text"
                            value={e.period}
                            onChange={(ev) => {
                              const updated = [...draft.education];
                              updated[idx] = { ...updated[idx], period: ev.target.value };
                              setDraft({ ...draft, education: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Score / Status</label>
                          <input
                            type="text"
                            value={e.score}
                            onChange={(ev) => {
                              const updated = [...draft.education];
                              updated[idx] = { ...updated[idx], score: ev.target.value };
                              setDraft({ ...draft, education: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: Skills */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-crimson-2">
                    Skill Categories ({draft.skillCategories.length})
                  </h4>
                  {draft.skillCategories.map((cat, cIdx) => (
                    <div key={cat.id} className="rounded-xl border border-white/10 bg-ink-2 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-sans text-sm font-bold text-bone">{cat.title}</span>
                        <span className="text-xs text-smoke">{cat.subtitle}</span>
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] text-smoke">
                          Skills in this category (comma separated)
                        </label>
                        <input
                          type="text"
                          value={cat.skills.map((s) => s.name).join(', ')}
                          onChange={(e) => {
                            const names = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                            const updated = [...draft.skillCategories];
                            updated[cIdx] = {
                              ...updated[cIdx],
                              skills: names.map((name) => {
                                const exist = cat.skills.find((s) => s.name === name);
                                return exist || { name, mono: name.slice(0, 2) };
                              }),
                            };
                            setDraft({ ...draft, skillCategories: updated });
                          }}
                          className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 6: Achievements */}
              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-crimson-2">
                    Top Moments & Achievements ({draft.achievements.length})
                  </h4>
                  {draft.achievements.map((a, aIdx) => (
                    <div key={a.id} className="rounded-xl border border-white/10 bg-ink-2 p-4">
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Title</label>
                          <input
                            type="text"
                            value={a.title}
                            onChange={(e) => {
                              const updated = [...draft.achievements];
                              updated[aIdx] = { ...updated[aIdx], title: e.target.value };
                              setDraft({ ...draft, achievements: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Organization</label>
                          <input
                            type="text"
                            value={a.org}
                            onChange={(e) => {
                              const updated = [...draft.achievements];
                              updated[aIdx] = { ...updated[aIdx], org: e.target.value };
                              setDraft({ ...draft, achievements: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-smoke">Laurel Badge</label>
                          <input
                            type="text"
                            value={a.laurel}
                            onChange={(e) => {
                              const updated = [...draft.achievements];
                              updated[aIdx] = { ...updated[aIdx], laurel: e.target.value };
                              setDraft({ ...draft, achievements: updated });
                            }}
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="mb-1 block text-[11px] text-smoke">Detail Description</label>
                        <input
                          type="text"
                          value={a.detail}
                          onChange={(e) => {
                            const updated = [...draft.achievements];
                            updated[aIdx] = { ...updated[aIdx], detail: e.target.value };
                            setDraft({ ...draft, achievements: updated });
                          }}
                          className="w-full rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-bone"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 7: Admin Security */}
              {activeTab === 'security' && (
                <div className="max-w-md space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-crimson-2">Admin Credentials</h4>
                  <p className="text-xs text-mist">
                    Change the email and password you use to log into this Admin Panel.
                  </p>

                  {securityMessage && (
                    <div className="rounded-lg bg-emerald-500/15 p-2.5 text-xs font-semibold text-emerald-400">
                      {securityMessage}
                    </div>
                  )}

                  <form onSubmit={handleSecuritySave} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">Admin Email</label>
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-smoke">Admin Password</label>
                      <input
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        required
                        className="w-full rounded-lg border border-white/15 bg-ink-2 px-3 py-2 text-xs text-bone focus:border-crimson-2"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-lg bg-crimson px-4 py-2 text-xs font-bold text-white hover:bg-crimson-2"
                    >
                      Update Credentials
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {isAuthenticated && (
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-6 py-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-crimson px-5 py-2 text-xs font-bold text-white shadow-[0_0_25px_rgba(229,19,43,0.4)] transition hover:bg-crimson-2"
              >
                <span>💾</span> Save Changes
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-mist hover:border-white/30 hover:text-bone"
              >
                📥 Export JSON
              </button>
              <label className="cursor-pointer rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-mist hover:border-white/30 hover:text-bone">
                📤 Import JSON
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to reset all portfolio data to factory defaults?')) {
                    resetData();
                    window.location.reload();
                  }
                }}
                className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-400 hover:border-red-500/50"
              >
                ↺ Reset
              </button>
            </div>

            <div className="flex items-center gap-3">
              {saveToast && (
                <span className="text-xs font-bold text-emerald-400 animate-pulse">
                  ✓ Changes Saved Successfully!
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className="rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-bone hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
