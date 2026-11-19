import Masthead from '../../components/Masthead';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'FAQ',
  description: 'Straight answers about Sentrion — what it does, which package managers and languages it covers, whether it needs root, performance, privacy, trust, and its open-source licence.',
  alternates: { canonical: '/faq' },
};

const QA = [
  ['What does Sentrion actually do?',
    <>It sits in front of any command you run. Before code executes it scans the package; while it runs it watches every file, process and network call; and the moment something malicious happens, it stops it and shows you why. A bouncer for your <code className="font-m text-[13.5px]">node_modules</code>.</>],
  ['Which package managers and languages does it cover?',
    <>Installs through npm, pnpm, Yarn, Bun, pip, uv and poetry. Runtime guarding for Node and Python today, with more on the way — and it guards <em>any</em> command&rsquo;s process tree, whatever language it&rsquo;s in.</>],
  ['Does it need root or admin?',
    <>No. The core runs as you, with no special privileges. A couple of hardening features — a system-level egress lock, deep kernel tracing — can use an optional helper, but you get full detect-and-kill without ever typing a password.</>],
  ['Will it slow down my installs?',
    <>Barely. In our benchmark a guarded run added about 55&nbsp;ms. A clean install runs straight through with zero prompts — you only ever stop for something that genuinely looks wrong.</>],
  ['Is my code or are my secrets ever sent anywhere?',
    <>Never. Sentrion runs entirely on your machine and phones nothing home. In fact it does the opposite: it swaps your real tokens for decoys before running untrusted scripts, so even a successful theft grabs a worthless canary.</>],
  ['What if a package genuinely needs an install script?',
    <>Press <b>Trust</b> once. Sentrion remembers that exact package, version range and behaviour — so <code className="font-m text-[13.5px]">esbuild</code> compiling a binary is fine forever, but if a future version suddenly phones home, it asks again.</>],
  ['Is it really open source?',
    <>Yes — MIT licensed, zero dependencies, and small enough to read in an afternoon. A security tool that pulls in 300 packages is its own supply-chain risk; Sentrion pulls in none.</>],
];

export default function FAQ() {
  return (
    <div className="w-full bg-paper text-ink p-1">
      <Masthead active="faq" eyebrow="HELP / FAQ" title="Straight answers."
        intro="No marketing fog. Here's what Sentrion does, what it needs from you, and what never leaves your laptop. Tap a question to open it." />

      <div className="px-[22px] pt-14 sm:px-[52px]">
        <div className="mx-auto max-w-[820px]">
          {QA.map(([q, a], i) => (
            <details key={i} open={i === 0} className={'border-t border-line' + (i === QA.length - 1 ? ' border-b' : '')}>
              <summary className="flex items-center justify-between gap-5 py-6 font-d text-[20px] font-bold text-ink">
                {q}<span className="faq-ic text-[26px] font-normal leading-none text-limeink" aria-hidden="true">+</span>
              </summary>
              <p className="mb-6 max-w-[700px] text-[15.5px] leading-[1.65] text-[#3f474f]">{a}</p>
            </details>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
