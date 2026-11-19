'use client';
import { useState, useCallback } from 'react';

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);

// The install-command pill with a working copy button. The only client code on
// the site. tone: 'hero' (dark pill, grey button) | 'lime' (dark pill, lime button).
export default function CopyCmd({ text = 'npm install -g sentrion', tone = 'hero', caret = false }) {
  const [done, setDone] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch {}
      ta.remove();
    }
    setDone(true); setTimeout(() => setDone(false), 1400);
  }, [text]);

  const btn = tone === 'lime'
    ? 'bg-lime text-ink'
    : 'bg-[#23262d] text-[#d6d7da]';

  return (
    <div className="inline-flex items-center gap-4 rounded-full border border-[#2a2d34] bg-[#15171c] py-[10px] pl-[22px] pr-[10px] font-m text-[15px] text-[#e8e6e0]">
      <span><span className="text-lime">$</span> {text}{caret && <span className="sx-caret text-lime" aria-hidden="true"> ▋</span>}</span>
      <button onClick={copy} aria-label="Copy install command"
        className={`btn-x flex items-center gap-[7px] rounded-full px-[14px] py-[7px] font-sans text-[12.5px] font-semibold ${done ? 'bg-good text-ink' : btn}`}>
        <CopyIcon />{done ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
