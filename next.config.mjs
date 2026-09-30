/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Cloudflare Pages serves the static export from out/.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
