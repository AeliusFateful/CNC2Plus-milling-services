/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/CNC2Plus-milling-services" : "";
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  assetPrefix: isProd ? "/CNC2Plus-milling-services/" : "",
  output: "export",
};

export default nextConfig;
