const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: [`src`], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
