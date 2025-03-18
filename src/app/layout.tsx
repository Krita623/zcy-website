import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';
import siteConfig from '../../site.config';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: ['编程', '题解', '个人网站', '博客'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
} 