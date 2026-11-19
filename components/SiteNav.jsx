import Link from 'next/link';

const LINKS = [['Home', '/'], ['Docs', '/docs'], ['Rules', '/rules'], ['FAQ', '/faq']];

export default function SiteNav({ active }) {
  return (
    <div className="relative flex items-center justify-between gap-4 px-6 py-[22px] text-[#f4f3f0] sm:px-8">
      <Link href="/" className="font-d text-[19px] font-extrabold tracking-[-0.01em]">
        Sentri<span className="text-lime">on</span>
      </Link>
      <nav aria-label="Primary" className="flex gap-3 text-[12.5px] font-medium text-[#d6d7da] sm:gap-[26px] sm:text-[14.5px]">
        {LINKS.map(([t, h]) => (
          <Link key={h} href={h} aria-current={active === t.toLowerCase() ? 'page' : undefined}
            className={'navlink' + (active === t.toLowerCase() ? ' text-white' : '')}>{t}</Link>
        ))}
      </nav>
      <a className="navlink shrink-0 text-[#d6d7da]" href="https://github.com/imeerai/sentrion"
        target="_blank" rel="noopener noreferrer" aria-label="Sentrion on GitHub">
        <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
        </svg>
      </a>
    </div>
  );
}
