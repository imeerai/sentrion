import Masthead from '../../components/Masthead';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Docs',
  description: 'The Sentrion manual — install, guard a command, read the Kill/Allow/Trust prompt, pick a mode, learn the commands, write a policy file, troubleshoot, and contribute.',
  alternates: { canonical: '/docs' },
};

const mono = 'font-m text-[14px]';
const chip = 'font-m text-[14px] bg-[#e9e8e3] px-[6px] py-[1px] rounded-[4px]';

function Code({ children, className = '' }) {
  return <div className={`rounded-[12px] bg-tile px-[18px] py-4 font-m text-[14px] leading-[2] text-[#e8e6e0] ${className}`}>{children}</div>;
}
const P = ({ children }) => <span className="text-lime">$</span>;
const H2 = ({ children }) => <h2 className="mb-3 font-d text-[30px] font-extrabold tracking-[-0.02em]">{children}</h2>;
const H3 = ({ children }) => <h3 className="mb-[10px] font-d text-[18px] font-bold">{children}</h3>;
const Para = ({ children, className = '' }) => <p className={`mb-[14px] text-[15.5px] leading-[1.65] text-[#3f474f] ${className}`}>{children}</p>;

const NAV = [
  ['GETTING STARTED', [['11', 'Introduction'], ['1', 'Installation'], ['2', 'Verify it works'], ['3', 'Your first guard']]],
  ['CORE CONCEPTS', [['4', 'The four moves'], ['5', 'The prompt — Kill / Allow / Trust'], ['6', 'Modes'], ['7', 'Commands'], ['8', 'Always-on mode']]],
  ['REFERENCE', [['9', 'Policy file'], ['10', 'Troubleshooting'], ['12', 'Contributing']]],
];

export default function Docs() {
  return (
    <div className="w-full bg-paper text-ink p-1">
      <Masthead active="docs" eyebrow="DOCUMENTATION" title="The Sentrion manual"
        intro="Pick a topic on the left. Each one opens on its own — install, guard a command, read the prompt, choose a mode, learn the commands, write a policy, and fix what trips people up." />

      {/* tab state (sr-only radios, keyboard-focusable) */}
      {['11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((n) => (
        <input key={n} className="dn" type="radio" name="dn" id={`n${n}`} defaultChecked={n === '11'} aria-label={`Docs section ${n}`} />
      ))}

      <div className="docs-wrap flex flex-col items-start lg:flex-row">
        {/* sidebar */}
        <nav className="docs-nav w-full shrink-0 px-6 py-8 lg:w-[262px] lg:py-12 lg:pl-10 lg:pr-6" aria-label="Documentation sections">
          {NAV.map(([group, items]) => (
            <div key={group} className="mb-[26px]">
              <div className="mb-3 font-m text-[11px] tracking-[0.08em] text-muted">{group}</div>
              <div className="flex flex-col gap-[11px]">
                {items.map(([id, label]) => (
                  <label key={id} htmlFor={`n${id}`} data-nav={id}>{label}</label>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* content */}
        <div className="w-full flex-1 px-6 py-8 lg:max-w-[820px] lg:min-h-[900px] lg:border-l lg:border-line lg:px-14 lg:py-12">

          <section className="docs-sec" data-sec="11">
            <H2>Introduction</H2>
            <Para>New to this? Sentrion is a safety net for the code you install and run. Every time you run <span className={chip}>npm install</span> or a script someone sent you, you are trusting thousands of lines you have never read — and one bad install script can steal your tokens, open a backdoor, or delete files before you notice.</Para>
            <Para>Sentrion sits in front of every command, watches what the code actually does, and stops it the moment it does something it should not. You do not need to be a security expert — put <span className={chip}>sentrion</span> in front of your command and it handles the rest. Clean code runs normally; only genuinely risky actions ever stop you.</Para>
            <div className="rounded-r-[10px] border-l-[3px] border-lime bg-[#f5f8ea] px-[18px] py-[14px] text-[14.5px] text-[#3f4e14]">Brand new? Read these three in order: <b>Installation</b> → <b>Your first guard</b> → <b>The prompt</b>. That is enough to use Sentrion on day one.</div>
          </section>

          <section className="docs-sec" data-sec="1" id="install">
            <H2>Installation</H2>
            <Para>Sentrion is a single Node.js CLI with zero dependencies. Install it globally once and it guards any command on your machine — no per-project setup, no root. You need Node 18 or newer; it runs the same on Linux, macOS and Windows.</Para>
            <p className="mb-2 text-[14px] text-muted">Install with whichever package manager you already use:</p>
            <Code className="mb-[30px]">
              <div><P /> npm install -g sentrion</div>
              <div><P /> pnpm add -g sentrion</div>
              <div><P /> yarn global add sentrion</div>
              <div><P /> bun add -g sentrion</div>
            </Code>
            <H3>If &quot;sentrion: command not found&quot;</H3>
            <p className="mb-[10px] text-[15px] leading-[1.6] text-[#3f474f]">After a global install, this just means npm&apos;s global bin folder is not on your <span className="font-m text-[13px]">PATH</span> (common on Debian and Kali). Either keep using <span className="font-m text-[13px]">npx sentrion</span>, which always works, or add the folder to your <span className="font-m text-[13px]">PATH</span> once, then open a new terminal:</p>
            <Code className="mb-[30px]"><span><P /> export PATH=&quot;$(npm config get prefix)/bin:$PATH&quot;</span></Code>
            <p className="mb-[30px] text-[14px] text-muted">Put that line in your <span className="font-m text-[13px]">~/.bashrc</span> or <span className="font-m text-[13px]">~/.zshrc</span> so it sticks. After that, <span className="font-m text-[13px]">sentrion</span> works on its own.</p>
            <H3>On a server or in CI</H3>
            <p className="mb-[10px] text-[15px] leading-[1.6] text-[#3f474f]">No global install needed — run it on demand with <span className="font-m text-[13px]">npx</span> and use <span className="font-m text-[13px]">enforce</span> mode so it blocks by policy and never waits for a prompt.</p>
            <Code className="mb-[30px]"><span><P /> npx sentrion --mode enforce npm ci</span></Code>
            <H3>What it can guard</H3>
            <p className="text-[15px] leading-[1.6] text-[#3f474f]">Installs through <b>npm, pnpm, Yarn, Bun, pip, uv</b> and <b>poetry</b> — and any command you run in <b>Node</b> or <b>Python</b> today, with more runtimes on the way. If it spawns a process, Sentrion sees it.</p>
          </section>

          <section className="docs-sec" data-sec="2">
            <H2>Verify it works</H2>
            <Para><span className={mono}>sentrion doctor</span> tells you exactly what your OS lets Sentrion see and block, so there are no surprises later.</Para>
            <div className="mb-[14px] rounded-[12px] bg-tile px-[18px] py-4 font-m text-[13.5px] leading-[1.9] text-[#c9cdd2]">
              <div><P /> sentrion doctor</div>
              <div className="text-[#6b6d72]">{'  '}platform{'      '}macOS 14 · arm64</div>
              <div className="text-[#6b6d72]">{'  '}node hook{'     '}<span className="text-[#7fc99a]">ok</span>{'   '}intercepts child_process, net, fs</div>
              <div className="text-[#6b6d72]">{'  '}python hook{'   '}<span className="text-[#7fc99a]">ok</span>{'   '}sys.addaudithook via sitecustomize</div>
              <div className="text-[#6b6d72]">{'  '}process tree{'  '}<span className="text-[#7fc99a]">ok</span>{'   '}can see and kill descendants</div>
              <div className="text-[#6b6d72]">{'  '}egress lock{'   '}<span className="text-[#d9b55a]">needs helper</span>{'   '}base mode still detects + kills</div>
            </div>
            <p className="text-[14px] text-muted">Green rows are active. A yellow row is an optional hardening feature — you still get full detect-and-kill without it. Run <span className="font-m text-[13px]">sentrion --help</span> for the full flag list.</p>
          </section>

          <section className="docs-sec" data-sec="3">
            <H2>Your first guard</H2>
            <Para>Put <span className={chip}>sentrion</span> in front of any command — an install, or a script in any language. Sentrion wraps it, watches the whole process tree, and only steps in when something crosses a line.</Para>
            <Code className="mb-4">
              <div><P /> sentrion npm install express</div>
              <div><P /> sentrion python3 app.py</div>
              <div><P /> sentrion pnpm add zod</div>
              <div><P /> sentrion node build.js</div>
            </Code>
            <p className="text-[15px] leading-[1.6] text-[#3f474f]">A clean run adds a few milliseconds and never prompts. A risky one pauses and asks — see <b>The prompt</b>.</p>
          </section>

          <section className="docs-sec" data-sec="4">
            <H2>The four moves</H2>
            <Para className="mb-6">Every guarded command runs through the same four moves. Each has its own command, shown below.</Para>
            {[
              ['01', 'Scan before install', 'Checks a package against the known-malware list, publish age, typosquat distance, and newly added install scripts — before anything runs. Scan on its own, without installing:', <><P /> sentrion scan left-pad</>],
              ['02', 'Watch at runtime', 'Hooks into Node and Python and tracks the whole process tree — every file, process and connection. It runs automatically whenever you prefix a command:', <><P /> sentrion &lt;any command&gt;</>],
              ['03', 'Kill, allow or trust', <>On a risky event it freezes the process and shows the evidence. Answer with a key — or set a mode so it decides for you (see <b>Modes</b>):</>, <><span className="text-lime">┌</span> PAUSED  [K] Kill  [A] Allow once  [T] Trust</>],
              ['04', 'Report & export', 'Every block becomes one incident per attack chain, as JSON and SARIF. Read the timeline anytime:', <><P /> sentrion report --last</>],
            ].map(([n, t, d, code], i, a) => (
              <div key={n} className={'flex gap-5 border-t border-line py-5' + (i === a.length - 1 ? ' border-b' : '')}>
                <span className="w-7 shrink-0 font-m text-[13px] text-limeink">{n}</span>
                <div className="flex-1">
                  <div className="mb-1 font-d text-[19px] font-bold">{t}</div>
                  <div className="mb-[10px] text-[14.5px] leading-[1.6] text-[#4a535d]">{d}</div>
                  <div className="rounded-[10px] bg-tile px-[14px] py-[11px] font-m text-[13px] text-[#e8e6e0]">{code}</div>
                </div>
              </div>
            ))}
          </section>

          <section className="docs-sec" data-sec="5">
            <H2>The prompt — Kill / Allow once / Trust</H2>
            <Para className="mb-5">When Sentrion pauses, you get three choices. Here&rsquo;s exactly what each does, and when to use it.</Para>
            <div className="mb-5 rounded-[12px] bg-tile px-[18px] py-4 font-m text-[13px] leading-[1.9] text-[#c9cdd2]">
              <div className="text-[#6b6d72]">$ sentrion npm install trusted-pkg</div>
              <div className="text-[#d9b55a]">! PROC-01  install script spawned a shell</div>
              <div className="text-[#ff6b57]">✕ NET-01   outbound host not in allowlist</div>
              <div className="text-lime">┌ PAUSED   [K] Kill   [A] Allow once   [T] Trust</div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ['Kill', 'bg-[#fdecea] text-[#c0392b]', "Ends the command and its whole process tree right away. Nothing it started keeps running; the incident is still written. The safe choice when you're unsure."],
                ['Allow once', 'bg-[#fbf1df] text-[#9a6410]', "Lets just this one action through, this single time. Everything else stays watched, and it asks again next run. For a step you know is fine but won't whitelist."],
                ['Trust', 'bg-lime text-ink', 'Remembers this package, version range and behaviour, so it won’t ask again — until something changes, then it asks afresh. For tools that genuinely need an install script.'],
              ].map(([t, cls, d]) => (
                <div key={t} className="rounded-[12px] border border-line p-[18px]">
                  <div className={`mb-[10px] inline-block rounded-full px-3 py-1 text-[12px] font-bold ${cls}`}>{t}</div>
                  <div className="text-[13.5px] leading-[1.55] text-[#4a535d]">{d}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="docs-sec" data-sec="6">
            <H2>Modes</H2>
            <Para className="mb-5">Sentrion runs in one of four modes. Set it per run with <span className={mono}>--mode</span>, or as a default in your policy file.</Para>
            <div className="mb-4 overflow-hidden rounded-[14px] border border-line">
              <div className="grid grid-cols-[110px_1fr] bg-[#f0f0ec] px-5 py-3 text-[12.5px] font-semibold text-[#6b6e76] sm:grid-cols-[130px_1fr]"><div>Mode</div><div>What happens, and when to use it</div></div>
              {[
                ['prompt', <><b>Pause and ask</b> — Kill / Allow once / Trust. The default; best on your own machine.</>],
                ['enforce', <><b>Block by policy, never ask</b> — for servers and CI where no one is watching.</>],
                ['audit', <><b>Log only, block nothing</b> — great for your first week, to see what installs actually do.</>],
                ['learn', <><b>Record and propose</b> — learns each package&rsquo;s normal behaviour and suggests allow rules.</>],
              ].map(([m, d]) => (
                <div key={m} className="grid grid-cols-[110px_1fr] items-start border-t border-line px-5 py-[14px] sm:grid-cols-[130px_1fr]">
                  <div className="font-m text-limeink">{m}</div><div className="text-[14px] leading-[1.55] text-[#3f474f]">{d}</div>
                </div>
              ))}
            </div>
            <Code><span><P /> sentrion --mode enforce npm ci</span></Code>
          </section>

          <section className="docs-sec" data-sec="7">
            <H2>Commands</H2>
            <Para className="mb-5">The full CLI. Every command is <span className={mono}>sentrion &lt;command&gt;</span>.</Para>
            <div className="overflow-hidden rounded-[14px] border border-line">
              <div className="grid grid-cols-[150px_1fr] bg-[#f0f0ec] px-5 py-3 text-[12.5px] font-semibold text-[#6b6e76] sm:grid-cols-[240px_1fr]"><div>Command</div><div>What it does</div></div>
              {[
                ['sentrion <command>', 'Guard any command and its process tree.'],
                ['sentrion scan <package>', 'Pre-flight scan a package without installing it.'],
                ['sentrion report', <>Show incidents; <span className="font-m text-[12.5px]">--last</span> for the most recent, <span className="font-m text-[12.5px]">--sarif</span> to export.</>],
                ['sentrion doctor', 'Check what your OS lets Sentrion see and block.'],
                ['sentrion --mode <mode>', 'Run in prompt / enforce / audit / learn for this command.'],
                ['sentrion shell-init', 'Print the shell hook for always-on guarding.'],
                ['sentrion --help', 'Every command and flag.'],
              ].map(([c, d]) => (
                <div key={c} className="grid grid-cols-[150px_1fr] border-t border-line px-5 py-[13px] sm:grid-cols-[240px_1fr]">
                  <div className="font-m text-[13px] text-ink">{c}</div><div className="text-[14px] text-[#3f474f]">{d}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="docs-sec" data-sec="8">
            <H2>Always-on mode</H2>
            <Para>Tired of typing the prefix? Add one line to your shell and <span className={mono}>npm</span>, <span className={mono}>pip</span>, <span className={mono}>pnpm</span> and friends are guarded automatically — even the installs a build script kicks off behind your back.</Para>
            <Code className="mb-3"><span><P /> eval &quot;$(sentrion shell-init)&quot;</span></Code>
            <p className="text-[14px] text-muted">Add that line to your <span className="font-m text-[13px]">~/.zshrc</span> or <span className="font-m text-[13px]">~/.bashrc</span> to make it permanent.</p>
          </section>

          <section className="docs-sec" data-sec="9" id="benchmark">
            <H2>Policy file</H2>
            <Para>Defaults ship built in. Layer a personal policy at <span className={mono}>~/.sentrion/policy.json</span>, and a project can add <span className={mono}>./.sentrion.json</span>. They merge in that order — and a project policy may only make things <b>stricter</b>, never looser, so a repo can&rsquo;t quietly weaken your guard.</Para>
            <div className="rounded-[12px] bg-tile px-[18px] py-4 font-m text-[13px] leading-[1.85] text-[#c9cdd2]">
              <div className="text-[#6b6d72]">// .sentrion.json</div>
              <div>{'{ '}<span className="text-[#9ecbff]">&quot;mode&quot;</span>: <span className="text-[#c7e88a]">&quot;enforce&quot;</span>,</div>
              <div>{'  '}<span className="text-[#9ecbff]">&quot;allow&quot;</span>: [<span className="text-[#c7e88a]">&quot;esbuild@^0.20&quot;</span>],</div>
              <div>{'  '}<span className="text-[#9ecbff]">&quot;deny&quot;</span>:&nbsp; [<span className="text-[#c7e88a]">&quot;NET-*&quot;</span>] {'}'}</div>
            </div>
          </section>

          <section className="docs-sec" data-sec="10">
            <H2>Troubleshooting</H2>
            {[
              ['A package I trust keeps asking', <>Its behaviour changed — usually a new version. That&rsquo;s Trust working as intended. Review the new evidence and press Trust again to pin it.</>],
              ['doctor says the egress lock needs a helper', 'That’s an optional system feature. Base mode still detects every outbound call and kills it — the helper only adds a kernel-level network lock.'],
              ['npm itself seems to trigger a file rule', <>File rules are gated to install scripts, not npm&rsquo;s own reads of <span className="font-m text-[13px]">~/.npmrc</span>. If you still see it, run <span className="font-m text-[13px]">sentrion doctor</span> — a stale hook is the usual cause, and reinstalling fixes it.</>],
              ['It didn’t prompt in CI', <>CI has no one to answer, so run it in <span className="font-m text-[13px]">enforce</span> mode. A pending prompt in CI is treated as a Kill — fail-closed.</>],
            ].map(([t, d], i, a) => (
              <div key={i} className={'border-t border-line py-[18px]' + (i === a.length - 1 ? ' border-b' : '')}>
                <div className="mb-1 font-d text-[16px] font-bold">{t}</div>
                <div className="text-[14px] leading-[1.6] text-[#4a535d]">{d}</div>
              </div>
            ))}
          </section>

          <section className="docs-sec" data-sec="12">
            <H2>Contributing</H2>
            <Para className="mb-4">Sentrion is open source under the MIT license, on GitHub. Found a bug, a false alarm, or a missing rule? Open an issue or a pull request — suggested changes are welcome. The whole codebase has zero dependencies and is small enough to read in an afternoon, so it is a friendly first contribution.</Para>
            <Code className="mb-4">
              <div><P /> git clone https://github.com/imeerai/sentrion</div>
              <div><P /> cd sentrion &amp;&amp; npm test</div>
            </Code>
            <p className="text-[14px] text-muted">Star the repo, fork it, and send a PR. Built by Imeer.ai · imeerai.</p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
