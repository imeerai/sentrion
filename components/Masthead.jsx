import SiteNav from './SiteNav';

// Reused dark masthead for the inner pages (Docs, Rules, FAQ).
export default function Masthead({ active, eyebrow, title, intro }) {
  return (
    <div className="px-5 pt-5">
      <div className="relative overflow-hidden rounded-[22px] bg-[#0a0b0e]"
        style={{ backgroundImage: 'linear-gradient(rgba(189,242,60,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(189,242,60,0.05) 1px, transparent 1px)', backgroundSize: '46px 46px' }}>
        <div className="absolute inset-0" aria-hidden="true"
          style={{ background: 'radial-gradient(120% 95% at 82% 0%, rgba(34,38,45,0.42) 0%, rgba(10,11,14,0) 55%)' }} />
        <header className="relative"><SiteNav active={active} /></header>
        <div className="relative px-6 pb-[50px] pt-9 text-[#f4f3f0] sm:px-8">
          <div className="mb-4 font-m text-[12px] tracking-[0.08em] text-lime">{eyebrow}</div>
          <h1 className="mb-4 font-d text-[clamp(30px,5.2vw,50px)] font-extrabold leading-[1.0] tracking-[-0.035em]">{title}</h1>
          <p className="max-w-[660px] text-[16.5px] leading-[1.6] text-[#c5c7cd]">{intro}</p>
        </div>
      </div>
    </div>
  );
}
