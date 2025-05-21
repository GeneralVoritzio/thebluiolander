"use client";

import Gravity, { MatterBody } from "@/fancy/components/physics/gravity";
import Image from 'next/image';

const worksData = [
  {
    key: "react",
    label: "react",
    color: "#0015ff",
    title: "React Project",
    subtitle: "A modern React-based UI",
    image: "/3dblu.png"
  },
  {
    key: "typescript",
    label: "typescript",
    color: "#e794da",
    title: "TypeScript App",
    subtitle: "Typed JavaScript at scale",
    image: "/3dblu.png"
  },
  {
    key: "motion",
    label: "motion",
    color: "#1f464d",
    title: "Motion Magic",
    subtitle: "Physics and animation",
    image: "/3dblu.png"
  },
  {
    key: "tailwind",
    label: "tailwind",
    color: "#ff5941",
    title: "Tailwind UI",
    subtitle: "Utility-first CSS",
    image: "/3dblu.png"
  },
  {
    key: "drei",
    label: "drei",
    color: "#f97316",
    title: "Drei Tools",
    subtitle: "3D helpers for React",
    image: "/3dblu.png"
  },
  {
    key: "matter-js",
    label: "matter-js",
    color: "#ffd726",
    title: "Matter.js",
    subtitle: "Physics engine",
    image: "/3dblu.png"
  },
];

export default function Works() {
  return (
    <div className="w-screen h-screen flex items-center justify-center relative font-azeret-mono bg-white overflow-hidden pt-[env(safe-area-inset-top)] pb-16" style={{ fontFamily: 'Articulat CF, sans-serif' }}>
      {/* Gravity area fills the container */}
      <div className="absolute inset-0 w-full h-[80vh] sm:h-full">
        <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
          {worksData.map((work, i) => (
            <MatterBody
              key={work.key}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              bodyType="rectangle"
              x={
                i === 0 ? "30%" :
                i === 1 ? "30%" :
                i === 2 ? "40%" :
                i === 3 ? "75%" :
                i === 4 ? "80%" :
                "50%"
              }
              y={
                i === 0 ? 120 :
                i === 1 ? 180 :
                i === 2 ? 150 :
                i === 3 ? 220 :
                i === 4 ? 250 :
                170
              }
            >
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-xl overflow-hidden flex items-center justify-center"
                style={{ fontFamily: 'Articulat CF, sans-serif' }}
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  className="object-cover w-full h-full"
                  draggable={false}
                  width={96}
                  height={96}
                />
              </div>
            </MatterBody>
          ))}
        </Gravity>
      </div>
      {/* Overlayed centered text area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground dark:text-muted w-full text-center" style={{ fontFamily: 'Articulat CF, sans-serif' }}>
          Our Works
        </div>
        <p className="mt-2 text-sm sm:text-base md:text-xl lg:text-2xl text-foreground dark:text-muted w-full text-center" style={{ fontFamily: 'Articulat CF, sans-serif' }}>
          COMING SOON
        </p>
      </div>
    </div>
  )
} 