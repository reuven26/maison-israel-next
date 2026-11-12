import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Conserve les images optimisées 31 jours dans le cache Vercel au lieu de
    // re-télécharger l'original depuis Supabase toutes les heures (egress).
    minimumCacheTTL: 2678400,
    // Next 16 n'autorise par défaut que q=75 ; on déclare les qualités utilisées
    // (cartes, galeries, vignettes admin) sinon l'optimiseur renvoie 400.
    qualities: [50, 55, 60, 65, 68, 70, 72, 75, 78, 80, 85],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avxwlqauymfqecypkrli.supabase.co" },
    ],
  },
  async headers() {
    return [
      {
        // Les URLs *.vercel.app servent le site à l'identique : sans ceci, Google
        // les indexe comme des doublons du domaine canonique (rapport Couverture :
        // « Page en double : Google n'a pas choisi la même URL canonique »).
        // On les désindexe sans les bloquer, pour garder les preview deployments utilisables.
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
