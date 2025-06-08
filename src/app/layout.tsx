import Cursor from '@/components/Cursor/Cursor';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import '@/styles/globals.scss';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'czhangy.io',
    description: "Charles Zhang's personal site",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // JSX
    return (
        <html lang="en">
            <body>
                <Navbar />
                <div className="page">{children}</div>
                <Cursor />
                <Footer />
                <Analytics />
            </body>
        </html>
    );
}
