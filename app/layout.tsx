import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ScreenGuard from "@/components/ScreenGuard";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "CookOff Portal - CodeChef VIT",
    template: "%s | CookOff Portal",
  },
  description: "Official coding competition portal for CookOff by CodeChef VIT. Participate in challenging programming contests, solve problems, and compete with developers worldwide.",
  keywords: ["coding", "programming", "contest", "competition", "cookoff", "codechef", "vit", "algorithms", "data structures", "online judge", "competitive programming"],
  authors: [{ name: "CodeChef VIT", url: "https://codechefvit.com" }],
  creator: "CodeChef VIT",
  publisher: "CodeChef VIT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "CookOff Portal - CodeChef VIT",
    description: "Official coding competition portal for CookOff by CodeChef VIT",
    url: "https://cookoff.codechefvit.com",
    siteName: "CookOff Portal",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "CookOff Portal - CodeChef VIT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CookOff Portal - CodeChef VIT",
    description: "Official coding competition portal for CookOff by CodeChef VIT",
    creator: "@codechefvit",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.webp", type: "image/webp" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon.png",
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://cookoff.codechefvit.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lg:h-screen lg:overflow-hidden">
      <head>
        <meta name="theme-color" content="#070E0A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CookOff Portal" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="CookOff Portal" />
        <meta name="msapplication-TileColor" content="#070E0A" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.variable} ${roboto.variable} antialiased lg:h-screen lg:overflow-hidden bg-[#070E0A]`}>
        <Toaster 
          position="top-right" 
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #333',
            },
            success: {
              style: {
                background: '#10B981',
                color: '#fff',
              },
            },
            error: {
              style: {
                background: '#EF4444',
                color: '#fff',
              },
            },
          }}
        />
        <ScreenGuard>
          {children}
        </ScreenGuard>
      </body>
    </html>
  );
}
