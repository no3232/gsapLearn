import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import ReactLenis from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}
