import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollLock } from '../hooks/smoothScroll';
import { useMedia } from '../hooks/useMedia';
import { EASE } from './fx';
import { ResumeSheet } from './ResumeViewer';

/** Full-screen PDF viewer with cross-device mobile support and toggle to HTML summary. */
export default function ResumeModal({ onClose }: { onClose: () => void }) {
  useScrollLock(true);
  const isMobile = useMedia('(max-width: 767px)');
  const [viewMode, setViewMode] = useState<'pdf' | 'sheet'>('pdf');
  const [iframeError, setIframeError] = useState(false);

  const portfolioContext = usePortfolio();
  const currentProfile = portfolioContext?.data?.profile || profile;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Construct absolute URL for Google Docs Viewer if relative
  const resumeUrl = currentProfile.resumePdf || '/assets/Rutvek_Ladhi_Resume.pdf';
  const isBase64 = resumeUrl.startsWith('data:');
  const isHttp = resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://');

  const absolutePdfUrl = typeof window !== 'undefined'
    ? (isHttp ? resumeUrl : `${window.location.origin}${resumeUrl}`)
    : resumeUrl;

  // On mobile/tablets, Android Chrome and iOS Safari cannot render raw PDFs in native iframes.
  // Google Docs Viewer renders PDF pages reliably across all mobile devices.
  const googleDocsViewerUrl = !isBase64
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(absolutePdfUrl)}&embedded=true`
    : resumeUrl;

  const viewerSrc = isMobile && !isBase64 ? googleDocsViewerUrl : `${resumeUrl}#view=FitH`;

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex flex-col bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
    >
      <div className="gutter flex h-16 shrink-0 items-center justify-between gap-3 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <p className="truncate font-display text-xl sm:text-2xl tracking-wide text-bone">The Full Story</p>
          <div className="flex rounded-lg bg-white/10 p-0.5 text-xs shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('pdf')}
              className={`rounded-md px-2.5 sm:px-3 py-1 font-semibold transition ${
                viewMode === 'pdf' ? 'bg-bone text-ink shadow' : 'text-smoke hover:text-white'
              }`}
            >
              📄 PDF
            </button>
            <button
              type="button"
              onClick={() => setViewMode('sheet')}
              className={`rounded-md px-2.5 sm:px-3 py-1 font-semibold transition ${
                viewMode === 'sheet' ? 'bg-bone text-ink shadow' : 'text-smoke hover:text-white'
              }`}
            >
              📝 Summary
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-bone hover:bg-white/20"
          >
            ↗ Open
          </a>
          <a
            href={resumeUrl}
            download={`${currentProfile.fullName.replace(/\s+/g, '_')}_Resume.pdf`}
            className="rounded-md bg-bone px-3.5 sm:px-4 py-2 text-xs font-bold text-ink hover:bg-white transition"
          >
            ⤓ Download
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume"
            data-cursor="close"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20"
          >
            ✕
          </button>
        </div>
      </div>

      <motion.div
        className="gutter flex-1 pb-6 min-h-0"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {viewMode === 'sheet' ? (
          <div data-lenis-prevent className="h-full overflow-y-auto pr-1">
            <ResumeSheet />
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="glass flex-1 flex min-h-12 items-center justify-center rounded-md text-sm font-semibold text-bone hover:bg-white/15"
              >
                Open Original PDF ↗
              </a>
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className="glass flex-1 flex min-h-12 items-center justify-center rounded-md text-sm font-semibold text-bone hover:bg-white/15"
              >
                Switch to PDF Viewer 📄
              </button>
            </div>
          </div>
        ) : (
          <div className="relative h-full w-full flex flex-col rounded-xl overflow-hidden bg-white/5 border border-white/10">
            {iframeError ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center text-bone">
                <p className="text-lg font-bold">PDF preview unavailable</p>
                <p className="mt-2 text-sm text-mist max-w-md">
                  Direct inline PDF embedding might be restricted by your browser. You can open or download the PDF directly below.
                </p>
                <div className="mt-6 flex gap-3">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-bone px-5 py-2.5 text-xs font-bold text-ink"
                  >
                    Open PDF in New Tab ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => setViewMode('sheet')}
                    className="rounded-md bg-white/10 px-5 py-2.5 text-xs font-bold text-bone"
                  >
                    View Summary
                  </button>
                </div>
              </div>
            ) : (
              <>
                <iframe
                  title={`${currentProfile.fullName} resume (PDF)`}
                  src={viewerSrc}
                  onError={() => setIframeError(true)}
                  className="h-full w-full bg-white border-0"
                />
                {isMobile && !isBase64 && (
                  <div className="p-2.5 bg-black/80 backdrop-blur border-t border-white/10 flex items-center justify-between text-xs text-smoke">
                    <span>Having trouble viewing?</span>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-crimson-2 font-semibold underline hover:text-white"
                    >
                      Open PDF directly ↗
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
