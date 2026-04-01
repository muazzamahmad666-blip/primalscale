"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HomeView from "@/components/HomeView";
import BookingView from "@/components/BookingView";

const FluidCanvas = dynamic(() => import("@/components/FluidCanvas"), { ssr: false });

export default function Page() {
  const [view, setView] = useState<"home" | "book">("home");

  useEffect(() => {
    function handleHash() {
      setView(window.location.hash === "#book" ? "book" : "home");
    }
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <>
      <FluidCanvas />

      {/* Background Gradient Spotlights */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-900/20 blur-[120px]" />
      </div>

      <Header />

      <div id="home-view" className={view === "home" ? "block" : "hidden"}>
        <HomeView />
      </div>
      <div id="book-view" className={view === "book" ? "block" : "hidden"}>
        <BookingView />
      </div>
    </>
  );
}
