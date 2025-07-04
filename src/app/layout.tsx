import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import '@/styles/globals.scss';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Inter, Raleway } from 'next/font/google';

export const metadata: Metadata = {
    title: 'czhangy.io',
    description: "Charles Zhang's personal site",
};

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // JSX
    return (
        <html lang="en" className={`${raleway.className} ${inter.className}`}>
            <body>
                <div className="background">
                    <Navbar />
                    {children}
                    <Footer />
                    <Analytics />
                </div>
            </body>
        </html>
    );
}
