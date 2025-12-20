import type { Metadata } from 'next';
import '../styles/globals.css'  // or App.css

export const metadata: Metadata = {
  title: 'Quantum Aether Games',
  description: 'Crafting digital worlds that are driven by the natural world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body style={{margin: 0, padding: 0, backgroundColor: '#0f172a'}}>
    {children}
    </body>
    </html>
  );
}
