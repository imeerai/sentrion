import Masthead from '../../components/Masthead';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Rules',
  description: 'The full default Sentrion rule set — what each rule watches for, and whether it blocks, asks, or warns. SCAN, REPO, PROC, FILE, PERS, NET and TOK rules.',
  alternates: { canonical: '/rules' },
};

const PREFLIGHT = [
  ['SCAN-01', 'the package is on a known-malware list', 'Block'],
  ['SCAN-02', 'a version was published less than 48 hours ago', 'Ask'],
  ['SCAN-03', 'a patch release quietly adds a new install script', 'Block'],
  ['SCAN-04', 'the name is one typo away from a popular package', 'Ask'],
  ['REPO-01', 'a repo runs a task the moment you open its folder', 'Warn'],
  ['REPO-02', 'a script pipes a download straight into a shell', 'Ask'],
];

const RUNTIME = [
  ['PROC-01', 'an install script spawns a shell', 'Ask'],
  ['PROC-02', 'it downloads a file and then runs it', 'Block'],
  ['PROC-05', 'it asks for root / admin (sudo, runas)', 'Block'],
  ['FILE-01', 'it reads a secret — ssh, aws, npmrc, keychain, wallet', 'Block'],
  ['FILE-02', 'it writes into another package, a git hook, or CI', 'Block'],
  ['PERS-01', 'it installs itself into a startup location', 'Block'],
  ['NET-01', "it dials a host that isn't the registry, during install", 'Block'],
  ['NET-04', 'it wires a shell to a socket (a reverse shell)', 'Block'],
  ['NET-05', 'it uploads to a paste site, raw IP, or chat webhook', 'Block'],
  ['TOK-01', 'a dependency runs npm publish or creates a repo', 'Block'],
];

const BADGE = {
  Block: 'bg-[#fdecea] text-[#c0392b]',
  Ask: 'bg-[#fbf1df] text-[#9a6410]',
  Warn: 'bg-[#ececea] text-[#6b6e76]',
};

function Table({ rows }) {
  return (
    <div className="mb-11 overflow-hidden rounded-[14px] border border-line">
      <div className="grid grid-cols-[92px_1fr_80px] bg-[#f0f0ec] px-5 py-3 text-[12.5px] font-semibold text-[#6b6e76] sm:grid-cols-[120px_1fr_96px]">
        <div>Rule</div><div>Fires when…</div><div className="text-right">Default</div>
      </div>
      {rows.map(([id, text, act]) => (
        <div key={id} className="grid grid-cols-[92px_1fr_80px] items-center border-t border-line px-5 py-[14px] sm:grid-cols-[120px_1fr_96px]">
          <div className="font-m text-[13px]">{id}</div>
          <div className="pr-3 text-[14.5px] text-[#3f474f]">{text}</div>
          <div className="text-right"><span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${BADGE[act]}`}>{act}</span></div>
        </div>
      ))}
    </div>
  );
}

export default function Rules() {
  return (
    <div className="w-full bg-paper text-ink p-1">
      <Masthead active="rules" eyebrow="REFERENCE / RULES" title="Every block has a name."
        intro="When Sentrion stops something, it never shows a vague score — it names the exact rule that fired. This is the full default rule set: what each rule watches for, and whether it blocks, asks, or just warns." />

      <div className="px-[22px] pt-[60px] sm:px-[52px]">
        <div className="mx-auto max-w-[860px]">
          <div className="mb-[14px] flex items-baseline justify-between">
            <h2 className="font-d text-[22px] font-bold tracking-[-0.015em]">Pre-flight</h2>
            <span className="text-[13px] text-muted">checked before any code runs</span>
          </div>
          <Table rows={PREFLIGHT} />

          <div className="mb-[14px] flex items-baseline justify-between">
            <h2 className="font-d text-[22px] font-bold tracking-[-0.015em]">Runtime</h2>
            <span className="text-[13px] text-muted">watched while it runs</span>
          </div>
          <Table rows={RUNTIME} />

          <div className="flex items-start gap-4 rounded-[14px] border border-line bg-white px-[26px] py-6">
            <span className="mt-[7px] h-[10px] w-[10px] shrink-0 rounded-full bg-lime" aria-hidden="true" />
            <div className="text-[15.5px] leading-[1.6] text-[#3f474f]">
              <b className="text-ink">Trust is narrow.</b> Press <b>Trust</b> and Sentrion remembers that one package, that version range, and that exact behaviour. If a later version does something new, it asks again — which is what stops a hijacked update of a package you already rely on.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
