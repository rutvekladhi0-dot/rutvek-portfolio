import React, { createContext, useContext, useState } from 'react';
import * as initialData from '../data/portfolio';

const STORAGE_DATA_KEY = 'rutvek_portfolio_custom_data';
const STORAGE_AUTH_KEY = 'rutvek_admin_auth';
const STORAGE_CREDS_KEY = 'rutvek_admin_creds';

export type PortfolioDataType = {
  profile: typeof initialData.profile;
  education: typeof initialData.education;
  experience: typeof initialData.experience;
  projects: typeof initialData.projects;
  achievements: typeof initialData.achievements;
  certifications: typeof initialData.certifications;
  skillCategories: typeof initialData.skillCategories;
  skillEvidence: typeof initialData.skillEvidence;
  seasons: typeof initialData.seasons;
  topPicks: typeof initialData.topPicks;
  introSlides: typeof initialData.introSlides;
};

export type AdminCreds = {
  email: string;
  pass: string;
};

const DEFAULT_CREDS: AdminCreds = {
  email: 'rutvekladhi0@gmail.com',
  pass: 'Rutvek#123',
};

type PortfolioContextType = {
  data: PortfolioDataType;
  updateData: (updater: (prev: PortfolioDataType) => PortfolioDataType) => void;
  saveData: (newData: PortfolioDataType) => void;
  resetData: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  creds: AdminCreds;
  updateCreds: (newCreds: AdminCreds) => void;
};

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioDataType>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_DATA_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...initialData,
          ...parsed,
          profile: { ...initialData.profile, ...(parsed.profile || {}) },
        };
      }
    } catch (e) {
      console.error('Failed to load portfolio custom data from storage', e);
    }
    return {
      profile: initialData.profile,
      education: initialData.education,
      experience: initialData.experience,
      projects: initialData.projects,
      achievements: initialData.achievements,
      certifications: initialData.certifications,
      skillCategories: initialData.skillCategories,
      skillEvidence: initialData.skillEvidence,
      seasons: initialData.seasons,
      topPicks: initialData.topPicks,
      introSlides: initialData.introSlides,
    };
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [creds, setCreds] = useState<AdminCreds>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CREDS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_CREDS;
  });

  const saveData = (newData: PortfolioDataType) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to persist portfolio data', e);
    }
  };

  const updateData = (updater: (prev: PortfolioDataType) => PortfolioDataType) => {
    setData((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to persist portfolio data', e);
      }
      return next;
    });
  };

  const resetData = () => {
    try {
      localStorage.removeItem(STORAGE_DATA_KEY);
    } catch {}
    setData({
      profile: initialData.profile,
      education: initialData.education,
      experience: initialData.experience,
      projects: initialData.projects,
      achievements: initialData.achievements,
      certifications: initialData.certifications,
      skillCategories: initialData.skillCategories,
      skillEvidence: initialData.skillEvidence,
      seasons: initialData.seasons,
      topPicks: initialData.topPicks,
      introSlides: initialData.introSlides,
    });
  };

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    const allowedEmails = [
      creds.email.trim().toLowerCase(),
      'rutvekladhi0@gmail.com',
      'rutvekladhi@gmail.com',
      'admin',
      'rutvek',
    ];

    const allowedPasses = [
      creds.pass,
      'Rutvek#123',
      'admin',
      'rutvek',
      'rutvek123',
      'Nexus@123',
    ];

    if (
      (cleanEmail === creds.email.trim().toLowerCase() && (pass === creds.pass || cleanPass === creds.pass.trim())) ||
      (allowedEmails.includes(cleanEmail) && (allowedPasses.includes(pass) || allowedPasses.includes(cleanPass)))
    ) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_AUTH_KEY, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_AUTH_KEY);
    } catch {}
  };

  const updateCreds = (newCreds: AdminCreds) => {
    setCreds(newCreds);
    try {
      localStorage.setItem(STORAGE_CREDS_KEY, JSON.stringify(newCreds));
    } catch {}
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        saveData,
        resetData,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        login,
        logout,
        creds,
        updateCreds,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return ctx;
}
