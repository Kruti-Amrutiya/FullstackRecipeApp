/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src"],
  },
  reactStrictMode: false,
  images: {
    domains: [
      "myfoodstory.com",
      "img.taste.com.au",
      "kannanskitchen.com",
      "aromaticessence.co",
      "www.themealdb.com",
      "next-recipe-app.yasinatesim.vercel.app",
      "www.maggi.in",
      "i0.wp.com",
      "www.google.com",
    ],
  },
};

export default nextConfig;
