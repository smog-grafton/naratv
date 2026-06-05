import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ContentModalProvider } from '@/components/providers/ContentModalProvider';
import ContentModalRoot from '@/components/modals/ContentModalRoot';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Nara TV Live | Premium Boxing Streaming',
  description: 'Watch live fights, pay-per-view events, and replays on Nara TV Live.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body suppressHydrationWarning className="bg-[#0a0a0c] text-white min-h-screen flex flex-col font-sans">
        <ContentModalProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ContentModalRoot />
        </ContentModalProvider>
      </body>
    </html>
  );
}
