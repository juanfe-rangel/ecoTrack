import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoTrack AI | Huella de carbono",
  description:
    "Estimación local de la huella de carbono de pequeños negocios a partir de lenguaje natural.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
