import './globals.css';

const SITE = 'https://sentrion.imeer.ai';

export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Sentrion — guard every install you ever run', template: '%s · Sentrion' },
  description: 'Sentrion is a live guard for developer machines. Prefix any command with sentrion and it scans, watches and blocks malicious install scripts, credential theft and backdoors — live, with zero dependencies.',
  keywords: ['supply chain security', 'npm malware', 'install guard', 'sentrion', 'devsecops', 'sandbox', 'postinstall'],
  authors: [{ name: 'imeerai', url: 'https://imeer.ai' }],
  creator: 'imeerai',
  applicationName: 'Sentrion',
  referrer: 'no-referrer',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', url: SITE, siteName: 'Sentrion',
    title: 'Sentrion — guard every install you ever run',
    description: 'A live guard for developer machines. Scans, watches and blocks malicious code before it runs. Open source, zero dependencies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sentrion — guard every install you ever run',
    description: 'A live guard for developer machines. Blocks malicious installs and scripts, live. Open source, zero dependencies.',
  },
};

export const viewport = { width: 'device-width', initialScale: 1, colorScheme: 'light', themeColor: '#0a0b0e' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
