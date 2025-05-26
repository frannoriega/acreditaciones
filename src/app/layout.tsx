import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acreditaciones",
  description: "Sistema de acreditaciones de la Fiesta Nacional de la Playa de Río",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} self-stretch antialiased flex flex-col w-full min-h-full h-full items-stretch justify-stretch justify-items-stretch`}
      >
        <ThemeProvider attribute="class" enableSystem enableColorScheme disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
