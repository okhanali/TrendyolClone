import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/assets/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QueryProvider from '@/components/providers/QueryProvider';
import AuthCookieSync from '@/components/auth/AuthCookieSync';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f27a1a',
};

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

// ELITE SEO CONFIGURATION
export const metadata: Metadata = {
  // Dinamik Domain Algılama (Deploy Hatasını Önler)
  metadataBase: new URL(defaultUrl),

  title: {
    default: "Trendyol Clone | Türkiye'nin En Trend Alışveriş Platformu",
    template: '%s | Trendyol Clone',
  },
  description:
    'Trendyol Clone ile en trend ürünleri keşfedin. Moda, elektronik, ev yaşam ürünlerinde en uygun fiyatlar ve hızlı teslimat kapınızda.',
  keywords: [
    'alışveriş',
    'e-ticaret',
    'moda',
    'giyim',
    'elektronik',
    'indirim',
    'online alışveriş',
  ],
  authors: [{ name: 'Trendyol Clone Team' }],

  // Gelişmiş Robot Kuralları
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Sosyal Medya Kartları (Open Graph)
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://trendyol-clone-tau.vercel.app/',
    title: 'Trendyol Clone | Alışverişin Yeni Adresi',
    description: 'En trend ürünler ve büyük indirimler Trendyol Clone güvencesiyle burada.',
    siteName: 'Trendyol Clone',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Trendyol Clone E-Ticaret',
      },
    ],
  },

  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased flex flex-col min-h-screen font-sans`}>
        <QueryProvider>
          <AuthCookieSync />

          <Header />

          <main className="flex-1 w-full">{children}</main>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
