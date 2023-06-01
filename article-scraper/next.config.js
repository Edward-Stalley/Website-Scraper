/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets-prd.ignimgs.com', "assets1.ignimgs.com", 'www.destructoid.com', "www.escapistmagazine.com","assetsio.reedpopcdn.com", "www.gameinformer.com"],

  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.example.com/:path*",

      },
    ];
  },
};

module.exports = nextConfig;