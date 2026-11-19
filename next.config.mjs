/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // fully static site — no server, smallest attack surface
  reactStrictMode: true,
  trailingSlash: true,       // clean /docs/ style URLs on static hosts
  images: { unoptimized: true },
  poweredByHeader: false,    // drop the X-Powered-By header
};
export default nextConfig;
