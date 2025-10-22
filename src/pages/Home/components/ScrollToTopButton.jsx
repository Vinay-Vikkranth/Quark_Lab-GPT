import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-10 z-50 bg-blue-100 text-blue-500 p-2 rounded-full shadow-lg hover:bg-blue-300 transition"
        aria-label="Scroll to top"
      >
        <ChevronUpIcon className="w-6 h-6" />
      </button>
    )
  );
}
