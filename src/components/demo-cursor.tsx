"use client";

import {
  MouseTrackerProvider as CursorProvider,
  Pointer as Cursor,
  PointerFollower as CursorFollow,
} from "@/components/ui/cursor";

const DemoCursor = () => {
  return (
    <div className="w-full h-screen bg-background relative">
      <CursorProvider>
        <Cursor>
          <div className="w-8 h-8 bg-blue-500 rounded-full opacity-50" />
        </Cursor>
        <CursorFollow align="bottom-right">
          <div className="bg-blue-500 text-white border border-white/10 text-xs px-3 py-1 rounded-md shadow-md">
            Follow me!
          </div>
        </CursorFollow>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4 cursor-none">Custom Cursor Demo</h1>
          <p className="text-lg mb-8 cursor-none">
            Move your mouse around to see the custom cursor in action!
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md cursor-none">
            Interactive Button
          </button>
        </div>
      </CursorProvider>
    </div>
  );
};

export { DemoCursor }; 