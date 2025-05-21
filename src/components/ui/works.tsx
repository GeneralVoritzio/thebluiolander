"use client";

import Gravity, { MatterBody } from "@/fancy/components/physics/gravity";
import Image from 'next/image';
import { useEffect, useState } from "react";

const worksData = [
  {
    key: "react",
    label: "react",
    color: "#0015ff",
    title: "React Project",
    subtitle: "A modern React-based UI",
    image: "/bluball.png"
  },
  {
    key: "typescript",
    label: "typescript",
    color: "#e794da",
    title: "TypeScript App",
    subtitle: "Typed JavaScript at scale",
    image: "/bluball.png"
  },
  {
    key: "motion",
    label: "motion",
    color: "#1f464d",
    title: "Motion Magic",
    subtitle: "Physics and animation",
    image: "/bluball.png"
  },
  {
    key: "tailwind",
    label: "tailwind",
    color: "#ff5941",
    title: "Tailwind UI",
    subtitle: "Utility-first CSS",
    image: "/bluball.png"
  },
  {
    key: "drei",
    label: "drei",
    color: "#f97316",
    title: "Drei Tools",
    subtitle: "3D helpers for React",
    image: "/bluball.png"
  },
  {
    key: "matter-js",
    label: "matter-js",
    color: "#ffd726",
    title: "Matter.js",
    subtitle: "Physics engine",
    image: "/bluball.png"
  },
  {
    key: "nextjs",
    label: "nextjs",
    color: "#000000",
    title: "Next.js App",
    subtitle: "React Framework",
    image: "/bluball.png"
  },
  {
    key: "framer",
    label: "framer",
    color: "#0055ff",
    title: "Framer Motion",
    subtitle: "Animation library",
    image: "/bluball.png"
  },
  {
    key: "redux",
    label: "redux",
    color: "#764abc",
    title: "Redux State",
    subtitle: "State management",
    image: "/bluball.png"
  },
  {
    key: "chakra",
    label: "chakra",
    color: "#319795",
    title: "Chakra UI",
    subtitle: "Accessible components",
    image: "/bluball.png"
  },
  {
    key: "vite",
    label: "vite",
    color: "#646cff",
    title: "Vite Build",
    subtitle: "Next-gen tooling",
    image: "/bluball.png"
  },
  {
    key: "vercel",
    label: "vercel",
    color: "#000000",
    title: "Vercel Deploy",
    subtitle: "Cloud platform",
    image: "/bluball.png"
  },
];

export default function Works() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visibleWorks = isMobile ? worksData.slice(0, 6) : worksData;

  return (
    <div className="w-screen h-screen flex items-center justify-center relative font-azeret-mono bg-white overflow-hidden pt-[env(safe-area-inset-top)] pb-16" style={{ fontFamily: 'Articulat CF, sans-serif' }}>
      {/* Gravity area fills the container */}
      <div className="absolute inset-0 w-full h-[80vh] sm:h-full">
        <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
          {visibleWorks.map((work, i) => (
            <MatterBody
              key={work.key}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              bodyType="rectangle"
              x={
                isMobile
                  ? (i < 3
                      ? `${20 + i * 30}%` // mobile row 1: 20%, 50%, 80%
                      : `${10 + (i - 3) * 30}%` // mobile row 2: 10%, 40%, 70%
                    )
                  : i < 6
                  ? `${10 + i * 16}%` // desktop row 1: 10%, 26%, 42%, 58%, 74%, 90%
                  : i < 12
                  ? `${2 + (i - 6) * 16}%` // desktop row 2: 2%, 18%, 34%, 50%, 66%, 82%
                  : "50%"
              }
              y={
                isMobile
                  ? (i < 3 ? 120 : 220) // two rows on mobile
                  : i < 6
                  ? 120 // desktop row 1
                  : 220 // desktop row 2
              }
            >
              <div
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-xl overflow-hidden flex items-center justify-center"
                style={{ fontFamily: 'Articulat CF, sans-serif' }}
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  className="object-cover w-full h-full"
                  draggable={false}
                  width={80}
                  height={80}
                />
              </div>
            </MatterBody>
          ))}
        </Gravity>
      </div>
      {/* Overlayed centered text area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground dark:text-muted w-full text-center" style={{ fontFamily: 'Articulat CF, sans-serif' }}>
          Our Works
        </div>
        <p className="text-xl mb-12 sm:text-base md:text-xl lg:text-2xl text-foreground dark:text-muted w-full text-center" style={{ fontFamily: 'Articulat CF, sans-serif' }}>
          COMING SOON
        </p>
      </div>
    </div>
  )
} 