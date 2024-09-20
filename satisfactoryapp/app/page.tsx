"use client";

import Navbar from "../components/Navbar";
import Background from "@/components/background";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <Background />

      {/* Conteúdo da página */}
      <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {/* Conteúdo adicional */}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          {/* Footer */}
        </footer>
      </div>
    </div>
  );
}
