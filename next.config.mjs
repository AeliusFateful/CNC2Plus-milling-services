const isProd = process.env.NODE_ENV === "production";
// Сайт публикуется на GitHub Pages в подкаталог репозитория.
const basePath = isProd ? "/CNC2Plus-milling-services" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
