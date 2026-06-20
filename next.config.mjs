/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático: o build gera /out portável (GitHub Pages, Vercel, Cloudflare,
  // Netlify, S3, Nginx — qualquer host de arquivos serve). Sem servidor Next.
  output: "export",
  // images.unoptimized é obrigatório no export estático (não há server p/ otimizar)
  images: { unoptimized: true },
  // trailing slash facilita hosts que esperam /pagina/ em vez de /pagina
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
