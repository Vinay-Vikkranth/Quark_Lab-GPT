"use client";

import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Games from "./components/Games";


export default function Home() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar />
      </header>
      <CTA />
      {/* Features */}
      <Features />
      {/* Games Sections */}
      <Games />
      <Footer />
    </div>
  );
}
