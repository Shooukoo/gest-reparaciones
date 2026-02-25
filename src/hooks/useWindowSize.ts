"use client";

import { useState, useEffect } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

/**
 * SSR-safe hook that returns the current window width and height.
 * Values are `undefined` on the server and during the first render
 * to avoid hydration mismatches.
 *
 * Usage:
 *   const { width } = useWindowSize();
 *   const isMobile = (width ?? 0) < 768;
 */
export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function update() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}
