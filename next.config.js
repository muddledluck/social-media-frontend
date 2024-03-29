/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // providing the locales supported by your application
  locales: ["en-US", "es-ES", "it-IT"],
  // default locale used when the non-locale paths are visited
  defaultLocale: "en-US",

  images: {
    domains: ["cloudflare-ipfs.com", "loremflickr.com", "robohash.org", "res.cloudinary.com"],
  },
}

module.exports = nextConfig
