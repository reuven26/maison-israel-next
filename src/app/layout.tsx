import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maison Israël — Immobilier de Prestige",
  description: "Spécialiste de l'immobilier de luxe en Israël pour les francophones.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
