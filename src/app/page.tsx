"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassButton } from '@/components/ui/glass-button';
import Works from '@/components/ui/works';
import MarqueeAlongSvgPath from "@/fancy/components/blocks/marquee-along-svg-path";
import Image from 'next/image';

const SECTIONS = ["hero", "works"];

const marqueePath = "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5";

const marqueeImgs = [
  {
    src: "/logowwhite.png",
    link: "/",
  },
  {
    src: "https://cdn.cosmos.so/b9909337-7a53-48bc-9672-33fbd0f040a1?format=jpeg",
    link: "https://www.instagram.com/p/DCOl6YTS85e/?igsh=MXNvdHhyczl1djJ6ZA%3D%3D",
  },
  {
    src: "https://cdn.cosmos.so/ecdc9dd7-2862-4c28-abb1-dcc0947390f3?format=jpeg",
    link: "https://www.instagram.com/p/C4RTJvVpP4R/?igsh=MWZwOTNlYTVodGszMw%3D%3D",
  },
  {
    src: "https://cdn.cosmos.so/79de41ec-baa4-4ac0-a9a4-c090005ca640?format=jpeg",
    link: "https://pangrampangram.com/products/mori",
  },
  {
    src: "https://cdn.cosmos.so/1a18b312-21cd-4484-bce5-9fb7ed1c5e01?format=jpeg",
    link: "https://www.sergidelgado.com/selected-work/ampersand",
  },
  {
    src: "https://cdn.cosmos.so/d765f64f-7a66-462f-8b2d-3d7bc8d7db55?format=jpeg",
    link: "https://www.instagram.com/p/C40XmANsoe_/?igsh=MXFlZGx4cmw3ZW1qYw%3D%3D",
  },
  {
    src: "https://cdn.cosmos.so/6b9f08ea-f0c5-471f-a620-71221ff1fb65?format=jpeg",
    link: "https://abduzeedo.com/super-stylish-type-explorations",
  },
  {
    src: "https://cdn.cosmos.so/40a09525-4b00-4666-86f0-3c45f5d77605?format=jpeg",
    link: "https://www.instagram.com/p/CrhdrGjr9yK/?igshid=MTc4MmM1YmI2Ng%3D%3D",
  },
  {
    src: "https://cdn.cosmos.so/14f05ab6-b4d0-4605-9007-8a2190a249d0?format=jpeg",
    link: "https://www.instagram.com/julian.stiber/p/By5RBApiDzE/?img_index=1",
  },
  {
    src: "https://cdn.cosmos.so/d05009a2-a2f8-4a4c-a0de-e1b0379dddb8?format=jpeg",
    link: "https://www.instagram.com/p/CeT3COysRNN/?img_index=2",
  },
  {
    src: "https://cdn.cosmos.so/ba646e35-efc2-494a-961b-b40f597e6fc9?format=jpeg",
    link: "https://www.instagram.com/godfreydadich/",
  },
  {
    src: "https://cdn.cosmos.so/e899f9c3-ed48-4899-8c16-fbd5a60705da?format=jpeg",
    link: "https://www.instagram.com/p/Bty1U6BhTOW/?img_index=5",
  },
  {
    src: "https://cdn.cosmos.so/24e83c11-c607-45cd-88fb-5059960b56a0?format=jpeg",
    link: "https://www.instagram.com/p/C48dxn1LqhC/?igsh=dmV5ZWR0Z2Y3Zzlt&img_index=3",
  },
  {
    src: "https://cdn.cosmos.so/cd346bce-f415-4ea7-8060-99c5f7c1741a?format=jpeg",
    link: "https://www.instagram.com/p/C08ZDVyyRhK/?img_index=2&igsh=bHAyZjcxYW1jZDNu",
  },
];

export default function Home() {
  const router = useRouter();
  const [section, setSection] = useState(typeof window !== 'undefined' && window.location.hash === "#works" ? 1 : 0);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync section state with URL hash
  useEffect(() => {
    const syncSectionWithHash = () => {
      setSection(window.location.hash === "#works" ? 1 : 0);
    };
    window.addEventListener("hashchange", syncSectionWithHash);
    syncSectionWithHash();
    return () => window.removeEventListener("hashchange", syncSectionWithHash);
  }, []);

  // Update hash on section change
  useEffect(() => {
    if (section === 1 && window.location.hash !== "#works") {
      router.replace("/#works");
    } else if (section === 0 && window.location.hash !== "") {
      router.replace("/#");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  // Prevent free scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Handle wheel and key events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 40 && section < SECTIONS.length - 1) {
        setSection(section + 1);
      } else if (e.deltaY < -40 && section > 0) {
        setSection(section - 1);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if ((e.key === "ArrowDown" || e.key === "PageDown") && section < SECTIONS.length - 1) {
        setSection(section + 1);
      } else if ((e.key === "ArrowUp" || e.key === "PageUp") && section > 0) {
        setSection(section - 1);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
    };
  }, [section]);

  // Handle touch swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (deltaY < -40 && section < SECTIONS.length - 1) {
        setSection(section + 1);
      } else if (deltaY > 40 && section > 0) {
        setSection(section - 1);
      }
      touchStartY.current = null;
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [section]);

  // Listen for custom 'goToWorks' event
  useEffect(() => {
    const goToWorks = () => setSection(1);
    window.addEventListener('goToWorks', goToWorks);
    return () => window.removeEventListener('goToWorks', goToWorks);
  }, []);

  return (
    <div ref={containerRef} className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        {section === 0 && (
          <motion.section
            key="hero"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 w-full h-full bg-transparent z-10"
          >
            <div className="absolute inset-0 w-full h-full z-0 bg-black">
              <MarqueeAlongSvgPath
                path={marqueePath}
                baseVelocity={6}
                slowdownOnHover={true}
                draggable={true}
                repeat={2}
                dragSensitivity={0.1}
                className="absolute left-0 lg:left-3/3 top-64 w-full lg:top-112 lg:w-[1000px] scale-120 lg:scale-120 xl:scale-160 z-0 pointer-events-none lg:-translate-x-1/2"
                grabCursor
              >
                {marqueeImgs.map((img, i) => (
                  <div
                    key={i}
                    className="w-14 h-full hover:scale-150 duration-300 ease-in-out"
                  >
                    <Image
                      src={img.src}
                      alt={`Example ${i}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                      width={56}
                      height={56}
                    />
                  </div>
                ))}
              </MarqueeAlongSvgPath>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-screen w-full text-center">
              <h1 className="text-8xl md:text-9xl font-light mb-12 text-white text-center" style={{ fontFamily: 'Articulat CF, sans-serif' }}>
                Stand out <br />
                in the <br />
                <span className="bg-white text-black rounded-full lg:px-6 px-2 py-2 inline-block">madness</span>
              </h1>
              <a
                href="https://cal.com/thebluio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlassButton variant="white" style={{ fontFamily: 'Articulat CF, sans-serif' }} className="font-bold border-none">
                  Get in touch
                </GlassButton>
              </a>
            </div>
          </motion.section>
        )}
        {section === 1 && (
          <motion.section
            key="works"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 w-full h-full bg-transparent z-20"
          >
            <Works />
            <div className="absolute left-1/2 bottom-8 mb-24 pb-[env(safe-area-inset-bottom)] -translate-x-1/2 z-30 flex justify-center">
              <GlassButton
                variant="black"
                style={{ fontFamily: 'Articulat CF, sans-serif' }}
                onClick={() => setSection(0)}
                aria-label="Back to hero section"
              >
                Back to Top
              </GlassButton>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
