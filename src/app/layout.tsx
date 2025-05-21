"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

const CustomCursor = dynamic(() => import('@/components/ui/cursor').then(mod => mod.CustomCursor), {
  ssr: false
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    // Hide nav if on /works or hash is #works
    const check = () => {
      setHideNav(
        pathname === '/works' ||
        window.location.hash === '#works'
      );
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${inter.className} cursor-none`}>
        <CustomCursor />
        {!hideNav && (
          <nav className="fixed top-6 left-0 right-0 z-[60]">
            <div className="container mx-auto flex items-center justify-between relative px-4 md:px-8">
              <Link href="/" className="cursor-none">
                <Image
                  src="/logowwhite.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </Link>
              <div className="absolute left-[100px] right-[100px] md:left-[140px] md:right-[140px] top-1/2 -translate-y-1/2">
                <div className="w-full h-[2px] bg-white" />
              </div>
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.button
                    key="close"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-4 cursor-none hover:opacity-70 transition-opacity z-[61] text-2xl min-w-[60px] text-right text-white"
                    style={{ fontFamily: 'Articulat CF, sans-serif' }}
                  >
                    ✕
                  </motion.button>
                ) : (
                  <motion.button
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMenuOpen(true)}
                    className="py-4 cursor-none hover:opacity-70 transition-opacity min-w-[60px] text-right text-white"
                  >
                    MENU
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </nav>
        )}

        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className={`fixed top-0 left-0 right-0 z-[55] origin-top`}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex flex-col items-center justify-center h-full space-y-8 bg-black"
              >
                <a 
                  href="https://cal.com/thebluio" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-6xl md:text-7xl font-medium hover:opacity-70 transition-opacity cursor-none flex items-center gap-6 text-white"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'Articulat CF, sans-serif' }}
                >
                  <Image
                    src="/logowwhite.png"
                    alt="Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  Contact
                </a>
                <Link
                  href="/#works"
                  className="text-6xl md:text-7xl font-medium hover:opacity-70 transition-opacity cursor-none flex items-center gap-6 text-white"
                  onClick={e => {
                    setIsMenuOpen(false);
                    if (window.location.pathname === "/") {
                      e.preventDefault();
                      window.location.hash = "#works";
                      window.dispatchEvent(new Event("goToWorks"));
                    }
                  }}
                  style={{ fontFamily: 'Articulat CF, sans-serif' }}
                >
                  <Image
                    src="/logowwhite.png"
                    alt="Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  Our Works
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={pathname} style={{ height: '100%' }}>
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
