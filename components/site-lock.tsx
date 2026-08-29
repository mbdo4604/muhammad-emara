"use client";

import { useEffect } from "react";

export function SiteLock() {
  useEffect(() => {
    const block = (event: Event) => event.preventDefault();

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const mod = event.ctrlKey || event.metaKey;

      // Block zoom shortcuts + common copy/save shortcuts
      if (mod && ["a", "c", "x", "s", "u", "p", "+", "=", "-", "_", "0"].includes(key)) {
        event.preventDefault();
      }
      if (key === "+" || key === "-" || key === "=") {
        if (mod) event.preventDefault();
      }
    };

    // Block Ctrl/Cmd + wheel zoom (desktop)
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) event.preventDefault();
    };

    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    document.addEventListener("selectstart", block);
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("gesturestart", block);
    document.addEventListener("gesturechange", block);
    document.addEventListener("gestureend", block);

    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("selectstart", block);
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("gesturestart", block);
      document.removeEventListener("gesturechange", block);
      document.removeEventListener("gestureend", block);
    };
  }, []);

  return null;
}
