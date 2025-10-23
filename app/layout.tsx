import type { Metadata } from 'next';
import '../styles/globals.css';
import { LeadMagnetModalProvider } from '../context/LeadMagnetModalContext';

export const metadata: Metadata = {
  title: 'Astrology Lead Magnets',
  description: 'Получите бесплатные астрологические материалы',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <LeadMagnetModalProvider>{children}</LeadMagnetModalProvider>
      </body>
    </html>
  );
}
