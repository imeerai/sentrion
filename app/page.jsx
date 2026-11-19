import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import CopyCmd from '../components/CopyCmd';

const SCENE = `$ sentrion npm install express
scan   31 packages   ok malware   ok age   ok scripts
watch  0 events outside the allowlist
ALLOW  install complete   0 prompts   0.4s
$ sentrion npm install trusted-pkg
preinstall spawned a shell
x NET-01   outbound host not in allowlist     high
x FILE-01  read ~/.npmrc  (canary token)       high
PAUSED  Kill  Allow once  Trust    no answer -> kill
$ sentrion python3 take-home.py
x FILE-01  read ~/.ssh/id_rsa  denied
x NET-05   connect 203.0.113.7  denied
incident 7f3a-02  written   nothing left the machine`;

const STEPS = [
  ['01', 'Scan before install', 'Malware list, age, typosquats, new scripts.'],
  ['02', 'Watch at runtime', 'Processes, files and network — Node & Python.'],
  ['03', 'Kill, allow or trust', 'A clear prompt with the evidence that fired.'],
  ['04', 'Report & export', 'One incident per chain — JSON and SARIF.'],
];

const KILLS = [
  ['$ npm install trusted-pkg', 'preinstall → steal NPM_TOKEN', '✕ NET-01 exfil blocked',
    'Shai-Hulud 2.0', "The npm worm that stole tokens and republished its victims' own packages. Sentrion cut its outbound connection before a byte left."],
  ['$ npm install (axios dep)', 'postinstall → curl | sh', '✕ PROC-02 dropper blocked',
    'Axios RAT', 'A poisoned transitive dependency that fetched and ran a remote-access trojan. Sentrion stopped the download-then-execute at the source.'],
  ['$ sentrion python3 app.py', 'reads ~/.ssh, phones home', '✕ FILE-01 secret read blocked',
    'Untrusted code, any language', 'A stranger’s script in any language — a take-home or a gist. Your code runs as normal, but the moment it grabs your SSH keys or phones home, Sentrion kills just that part.'],
];

const STATS = [
  ['9 / 9', 'attack samples caught in testing'],
  ['0 / 7', 'false alarms on clean installs'],
  ['~55 ms', 'added to each run'],
];

export default function Home() {
  return (
    <div className="w-full bg-paper text-ink p-1">

      {/* ===== hero ===== */}
      <div>
        <div className="herogrid relative min-h-[calc(100vh_-_0.5rem)] overflow-hidden rounded-[22px] bg-[#0a0b0e]"
          style={{ backgroundImage: 'linear-gradient(rgba(189,242,60,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(189,242,60,0.05) 1px, transparent 1px)', backgroundSize: '46px 46px' }}>
          <div className="heroscene absolute inset-0 whitespace-pre px-[26px] py-5 font-m text-[13px] leading-[2] text-[#3f5a28] opacity-45" aria-hidden="true">{SCENE}</div>
          <div className="absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(120% 85% at 50% 0%, rgba(32,36,43,0.45) 0%, rgba(10,11,14,0) 48%), linear-gradient(180deg, rgba(10,11,14,0.55) 0%, rgba(10,11,14,0.82) 100%)' }} />
          <div className="herosweep absolute left-0 top-0 h-full w-[26%]" aria-hidden="true" style={{ background: 'linear-gradient(90deg, transparent, rgba(189,242,60,0.11), transparent)', pointerEvents: 'none' }} />
          <div className="herosweep absolute left-0 top-0 h-full w-[18%]" aria-hidden="true" style={{ background: 'linear-gradient(90deg, transparent, rgba(189,242,60,0.06), transparent)', pointerEvents: 'none', animationDelay: '3.5s' }} />

          <header className="relative"><SiteNav active="home" /></header>

          <div className="relative px-5 pb-[80px] pt-[72px] text-center text-[#f4f3f0] sm:px-8 sm:pt-[86px]">
            <div className="mb-[26px] inline-flex items-center gap-2 rounded-full border border-[#2a2d34] px-[14px] py-[6px] text-[12.5px] text-[#b7bac1]">
              <span className="herodot inline-block h-[7px] w-[7px] rounded-full bg-lime" aria-hidden="true" /> Guards Node &amp; Python · zero dependencies
            </div>
            <h1 className="mx-auto mb-[18px] max-w-[900px] font-d text-[clamp(31px,6.1vw,66px)] font-extrabold leading-[0.98] tracking-[-0.035em]">
              Guard Every Install<br />You <span className="text-lime">Ever</span> Run
            </h1>
            <p className="mx-auto mb-8 max-w-[560px] text-[17px] text-[#c5c7cd]">
              Prefix any command with <span className="font-m text-[#f4f3f0]">sentrion</span>. It scans, watches and blocks malicious code — live, with zero dependencies.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CopyCmd tone="hero" caret />
              <Link href="/docs" className="btn-x rounded-full bg-lime px-[26px] py-[13px] font-semibold text-ink">Get Started</Link>
            </div>
            <div className="mt-[18px] text-[13.5px] text-[#9a9ca2]">Click to copy, then <span className="font-m text-[#d6d7da]">sentrion</span> <span className="font-m text-[#7f8288]">&lt;any command&gt;</span></div>
          </div>
        </div>
      </div>

      {/* ===== logos ===== */}
      <div className="border-b border-line px-[22px] py-[46px] sm:px-[52px]">
        <div className="mb-[22px] text-center text-[13px] text-muted">Guards every install, whatever you reach for</div>
        <div className="flex flex-wrap items-center justify-center gap-x-[58px] gap-y-4 font-d text-[22px] font-bold text-[#acaeb3]">
          <span>npm</span><span>pnpm</span><span>Yarn</span><span>Bun</span><span>pip</span><span>uv</span>
        </div>
      </div>

      {/* ===== quote ===== */}
      <div className="px-[22px] py-[104px] text-center sm:px-[52px]">
        <p className="mx-auto max-w-[940px] font-d text-[clamp(23px,4.2vw,42px)] font-bold leading-[1.2] tracking-[-0.02em]">
          Turning off install scripts just moves the trigger. <span className="text-muted">Sentrion guards install, import and first run — and tells you exactly why it pulled the plug.</span>
        </p>
      </div>

      {/* ===== live guard ===== */}
      <div className="px-[22px] pt-[104px] sm:px-[52px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-[14px] font-m text-[12px] text-limeink">LIVE GUARD</div>
            <h2 className="mb-[18px] font-d text-[clamp(30px,5vw,52px)] font-extrabold tracking-[-0.03em]">It watches<br />every move.</h2>
            <p className="mb-6 max-w-[440px] text-[16px] leading-[1.6] text-[#4a535d]">Sentrion wraps the command, hooks into Node and Python, and tracks the whole process tree. The second a script spawns a shell, reads a secret, or dials an unknown server — it pauses, shows you the evidence, and waits for your call.</p>
            <Link href="/docs" className="btn-x inline-block rounded-full bg-lime px-[22px] py-[11px] text-[14px] font-semibold text-ink">See how it works</Link>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-[16px] bg-tile">
            <div className="absolute left-[22px] top-[22px] font-m text-[13px] leading-[1.95] text-[#c9d1dc]">
              <div><span className="text-lime">$</span> sentrion npm install trusted-pkg</div>
              <div className="text-[#d9b55a]">! PROC-01 shell spawned</div>
              <div className="text-brick">✕ NET-01 blocked</div>
              <div className="text-lime">┌ PAUSED  Kill · Allow · Trust</div>
            </div>
            <div className="absolute bottom-5 left-[22px] font-d text-[22px] font-bold text-[#f4f3f0]">Blocked in 0.33s</div>
            <div className="absolute bottom-5 right-[22px] font-m text-[11px] text-[#6b6d72]">incident 7f3a-02</div>
          </div>
        </div>
      </div>

      {/* ===== how it works ===== */}
      <div className="px-[22px] pt-[104px] sm:px-[52px]">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-5">
          <h2 className="font-d text-[clamp(24px,3.4vw,32px)] font-extrabold tracking-[-0.02em]">Four moves, one engine</h2>
          <div className="text-right">
            <Link href="/docs" className="btn-x inline-block rounded-full bg-lime px-4 py-2 text-[13px] font-semibold text-ink">Read docs</Link>
            <div className="mt-[10px] text-[13px] text-muted">The same on Linux, macOS and Windows.</div>
          </div>
        </div>
        <div>
          {STEPS.map(([n, t, d], i) => (
            <div key={n} className={'step-row grid grid-cols-[30px_1fr] items-center gap-[18px] border-t border-line py-5 lg:grid-cols-[44px_1fr_320px_44px]' + (i === STEPS.length - 1 ? ' border-b' : '')}>
              <span className="font-m text-[12px] text-muted">{n}</span>
              <span className="font-d text-[clamp(21px,3vw,30px)] font-bold tracking-[-0.02em]">{t}</span>
              <span className="hidden text-[13.5px] text-muted lg:block">{d}</span>
              <span className="hidden h-9 w-9 items-center justify-center justify-self-end rounded-full border border-line lg:flex">↗</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== checkpoint diagram ===== */}
      <div className="px-[22px] pt-[104px] sm:px-[52px]">
        <div className="mx-auto mb-9 max-w-[820px] text-center">
          <h2 className="mb-3 font-d text-[clamp(24px,3.6vw,36px)] font-extrabold tracking-[-0.025em]">One checkpoint for every command</h2>
          <p className="mx-auto max-w-[560px] text-[14.5px] leading-[1.6] text-muted">Sentrion sits between the code you run and your machine — clean work passes straight through, and anything that reaches for your secrets or network stops right here.</p>
        </div>
        <div className="rounded-[20px] border border-line bg-[#fbfbfa] px-10 py-11">
          <svg viewBox="0 0 1160 360" width="100%" role="img" className="block"
            aria-label="Diagram: a command enters Sentrion, which lets a clean install through and blocks an outbound exfiltration attempt.">
            <defs>
              <marker id="ink" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#0e0e10" /></marker>
              <marker id="limeA" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#5f7a12" /></marker>
            </defs>
            <path d="M284 180 H452" stroke="#0e0e10" strokeWidth="1.5" fill="none" markerEnd="url(#ink)" />
            <path d="M642 150 C726 108, 800 92, 880 92" stroke="#5f7a12" strokeWidth="2" fill="none" markerEnd="url(#limeA)" />
            <path d="M642 210 C726 252, 800 268, 858 268" stroke="#d2452f" strokeWidth="2" strokeDasharray="5 6" fill="none" />
            <rect x="879" y="47" width="262" height="90" rx="17" fill="none" stroke="#bdf23c" strokeWidth="2.5" opacity="0"><animate attributeName="opacity" dur="8s" repeatCount="indefinite" values="0;0;0.9;0.15;0;0;0.9;0.15;0;0;0.9;0.15;0" keyTimes="0;0.17;0.21;0.28;0.35;0.42;0.46;0.53;0.60;0.67;0.71;0.78;1" /></rect>
            <rect x="857" y="237" width="284" height="62" rx="15" fill="none" stroke="#d2452f" strokeWidth="2.5" opacity="0"><animate attributeName="opacity" dur="8s" repeatCount="indefinite" values="0;0;0.9;0.15;0" keyTimes="0;0.90;0.955;0.99;1" /></rect>
            <rect x="24" y="138" width="258" height="84" rx="14" fill="#ffffff" stroke="#0e0e10" strokeWidth="1.5" />
            <text x="46" y="173" fontFamily="'JetBrains Mono', monospace" fontSize="14" fill="#0e0e10">$ npm install</text>
            <text x="46" y="195" fontFamily="'JetBrains Mono', monospace" fontSize="14" fill="#83858c">trusted-pkg</text>
            <text x="26" y="250" fontFamily="Inter, sans-serif" fontSize="13" fill="#83858c">A command you run</text>
            <rect x="470" y="96" width="172" height="168" rx="18" fill="#0b0c0f" />
            <path d="M556 124 C560 150 566 156 592 160 C566 164 560 170 556 196 C552 170 546 164 520 160 C546 156 552 150 556 124Z" fill="#bdf23c"><animate attributeName="opacity" values="1;0.5;1" dur="2.2s" repeatCount="indefinite" /></path>
            <text x="556" y="216" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="17" fill="#f4f3f0">Sentrion</text>
            <text x="556" y="236" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#8a8d93">watches live</text>
            <rect x="884" y="52" width="252" height="80" rx="14" fill="#ffffff" stroke="#0e0e10" strokeWidth="1.5" />
            <text x="906" y="89" fontFamily="Archivo, sans-serif" fontWeight="700" fontSize="16" fill="#0e0e10">Clean install runs</text>
            <text x="906" y="111" fontFamily="Inter, sans-serif" fontSize="12.5" fill="#83858c">0 prompts, a few ms</text>
            <text x="884" y="154" fontFamily="Inter, sans-serif" fontSize="13" fill="#5f7a12" fontWeight="600">Allowed through</text>
            <rect x="862" y="242" width="274" height="52" rx="12" fill="#fdecea" stroke="#f1b7ad" strokeWidth="1.5" />
            <text x="884" y="273" fontFamily="'JetBrains Mono', monospace" fontSize="13" fill="#c0392b">✕ NET-01 outbound blocked</text>
            <text x="862" y="318" fontFamily="Inter, sans-serif" fontSize="13" fill="#c0392b" fontWeight="600">Stopped before anything leaves</text>
            <circle r="5" fill="#0e0e10"><animateMotion dur="2s" repeatCount="indefinite" path="M284 180 L452 180" /><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.15;0.75;1" /></circle>
            <circle r="6" fill="#bdf23c" stroke="#5f7a12" strokeWidth="1"><animateMotion dur="8s" begin="0.3s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1" keyTimes="0;0.16" path="M642 150 C726 108, 800 92, 880 92" /><animate attributeName="opacity" dur="8s" begin="0.3s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.02;0.14;0.17;1" /></circle>
            <circle r="6" fill="#bdf23c" stroke="#5f7a12" strokeWidth="1"><animateMotion dur="8s" begin="2.3s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1" keyTimes="0;0.16" path="M642 150 C726 108, 800 92, 880 92" /><animate attributeName="opacity" dur="8s" begin="2.3s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.02;0.14;0.17;1" /></circle>
            <circle r="6" fill="#d2452f"><animateMotion dur="8s" begin="6.3s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1" keyTimes="0;0.16" path="M642 210 C726 252, 800 268, 858 268" /><animate attributeName="opacity" dur="8s" begin="6.3s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.02;0.13;0.16;1" /></circle>
          </svg>
        </div>
      </div>

      {/* ===== kill log ===== */}
      <div className="mx-5 mt-[104px]">
        <div className="rounded-[20px] border border-line bg-white px-10 py-12">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-5">
            <h2 className="font-d text-[clamp(26px,4vw,40px)] font-extrabold tracking-[-0.03em]">The kill log</h2>
            <div className="text-right">
              <Link href="/rules" className="btn-x inline-block rounded-full bg-lime px-4 py-2 text-[13px] font-semibold text-ink">See the rules</Link>
              <div className="mt-[10px] max-w-[300px] text-[13px] text-muted">Every block names the exact rule that fired.</div>
            </div>
          </div>
          {KILLS.map(([c1, c2, c3, title, body], i) => (
            <div key={title} className={'grid grid-cols-1 items-center gap-6 border-t border-line py-[22px] lg:grid-cols-[300px_1fr_130px]' + (i === KILLS.length - 1 ? ' border-b' : '')}>
              <div className="rounded-[10px] bg-tile px-[14px] py-3 font-m text-[11.5px] leading-[1.8] text-[#c9cdd2]">
                <div className="text-[#6b6d72]">{c1}</div><div>{c2}</div><div className="text-[#ff6b57]">{c3}</div>
              </div>
              <div>
                <div className="font-d text-[24px] font-bold">{title}</div>
                <div className="mt-1 text-[13.5px] text-muted">{body}</div>
              </div>
              <div className="justify-self-start rounded-full bg-lime px-4 py-[7px] font-d text-[12px] font-bold text-ink lg:justify-self-end">STOPPED</div>
            </div>
          ))}
          <div className="mt-[30px] flex flex-wrap items-center justify-between gap-10 border-t border-line pt-6">
            <div className="flex flex-wrap items-start gap-12">
              {STATS.map(([v, l]) => (
                <div key={v}><div className="font-d text-[30px] font-extrabold">{v}</div><div className="mt-[2px] max-w-[150px] text-[12.5px] text-muted">{l}</div></div>
              ))}
            </div>
            <div className="max-w-[260px] text-right text-[12px] leading-[1.5] text-muted">From a small synthetic benchmark — Node &amp; Python, Linux.</div>
          </div>
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div className="px-[22px] pb-11 pt-[72px] text-center sm:px-[52px]" id="install">
        <h2 className="mb-[22px] font-d text-[clamp(29px,5.2vw,54px)] font-extrabold tracking-[-0.035em]">One line. Then stop worrying.</h2>
        <CopyCmd tone="lime" />
      </div>

      <Footer />
    </div>
  );
}
