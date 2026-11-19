import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-5 mb-5 mt-[72px] overflow-hidden rounded-[20px] bg-tile px-9 pb-[30px] pt-11 text-[#f4f3f0]">
      <div className="grid grid-cols-1 gap-6 pb-9 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="max-w-[280px] text-[14px] text-[#8a8d93]">
          A live guard for the software you install and run. Open source, zero dependencies, no root.
        </div>
        <FootCol title="Product" items={[['Docs', '/docs'], ['Rules', '/rules'], ['Changelog', 'https://github.com/imeerai/sentrion/releases']]} />
        <FootCol title="Resources" items={[['Install', '/docs'], ['Policy', '/rules'], ['Benchmark', '/docs']]} />
        <FootCol title="Social" items={[['GitHub', 'https://github.com/imeerai/sentrion'], ['LinkedIn', 'https://www.linkedin.com/in/imeerai/']]} />
      </div>
      <div className="border-t border-[#1f2126] pt-6 font-d text-[clamp(52px,11.6vw,150px)] font-black leading-[0.8] tracking-[-0.05em] [word-break:break-word]">
        SENTRI<span className="text-lime">ON</span>
      </div>
      <div className="mt-5 flex flex-wrap justify-between gap-4 text-[13px] text-[#8a8d93]">
        <span>Built by Imeer.ai · imeerai</span>
        <span>© 2026 Sentrion. MIT licensed.</span>
      </div>
    </footer>
  );
}

function FootCol({ title, items }) {
  return (
    <div className="flex flex-col gap-[9px] text-[14px] text-[#8a8d93]">
      <span className="mb-[3px] font-semibold text-[#f4f3f0]">{title}</span>
      {items.map(([t, h]) => (
        h.startsWith('http')
          ? <a key={t} className="navlink w-fit" href={h} target="_blank" rel="noopener noreferrer">{t}</a>
          : <Link key={t} className="navlink w-fit" href={h}>{t}</Link>
      ))}
    </div>
  );
}
