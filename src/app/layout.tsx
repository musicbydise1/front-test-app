import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientProvider from './ClientProvider'; // Импортируем клиентский компонент

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Product Store',
    description: 'An e-commerce platform for browsing and purchasing products',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ClientProvider> {/* Оборачиваем в ClientProvider */}
            {children}
        </ClientProvider>
        </body>
        </html>
    );
}
