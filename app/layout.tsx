import type { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
