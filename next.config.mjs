/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add remote image patterns here if needed in the future
      // Example: { protocol: "https", hostname: "example.com" }
    ]
  }
};

export default nextConfig;
