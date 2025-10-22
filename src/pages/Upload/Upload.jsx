import Footer from "@/layout/Footer";
import { useEffect } from "react";
import Form from "./components/Form";

export default function Upload() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-[length:400%_400%] animate-gradientShift"
      style={{
        backgroundImage:
          "linear-gradient(-45deg, #f8fafc, #e0f2fe)"
      }}
    >
      <div className="flex flex-col min-h-screen w-full">
        {/* Header */}
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-6 lg:px-8"
          >
            <div className="flex items-center justify-center w-full">
              <a
                href="https://www.asu.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="-m-1.5 p-1.5"
              >
                <span className="sr-only">Arizona State University</span>
                <img
                  alt="ASU Logo"
                  src="src/assets/ASU-Logo.png"
                  className="h-17 w-auto transform transition-transform duration-200 hover:-translate-y-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
                />
              </a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="container px-8 md:px-16 lg:px-32 pt-34 pb-24">
            <Form />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
