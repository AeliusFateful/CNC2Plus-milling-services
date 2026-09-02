/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/CNC2Plus-milling-services" : "",
  assetPrefix: isProd ? "/CNC2Plus-milling-services/" : "",
  output: "export",
};

export default nextConfig;
