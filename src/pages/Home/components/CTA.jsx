import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";
import mainVideo from "../../../assets/mainpage.mp4";


export default function CTA() {
  const fullText =
    "Unlock your potential with AI-powered learning tools that adapt to your unique needs and learning style.";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      setIndex((prevIndex) => {
        const next = prevIndex + 1;
        if (next === fullText.length) {
          setTimeout(() => {
            setTypedText("");
            setIndex(0);
          }, 2000);
        }
        return next;
      });
    }, 50);

    return () => clearInterval(typingInterval);
  }, [index]);

  useEffect(() => {
    if (selectedIndex !== null) {
      setShowResponse(false);
      setTypedAnswer("");
      const delay = setTimeout(() => {
        setShowResponse(true);
        let charIndex = 0;
        const interval = setInterval(() => {
          if (charIndex < examples[selectedIndex].response.length) {
            setTypedAnswer((prev) =>
              prev + examples[selectedIndex].response.charAt(charIndex)
            );
            charIndex++;
          } else {
            clearInterval(interval);
          }
        }, 15);
        return () => clearInterval(interval);
      }, 300);
      return () => clearTimeout(delay);
    }
  }, [selectedIndex]);

  const handlePromptClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <div className="relative isolate px-6 pt-20 pb-32 lg:px-8">
      {/* Video Background - Uncomment if needed */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20 bg-video-blur"
        src={mainVideo}
      /> */}
      
      <div className="absolute inset-x-0 top-0 z-10 overflow-hidden leading-none rotate-180">
        <svg
          className="w-full h-[200px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
            fill="#a5b4fc"
            opacity="0.3"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z; M0,0 C200,80 1000,30 1200,90 L1200,120 L0,120 Z; M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
            />
          </path>
          <path
            d="M0,0 C400,80 800,30 1200,90 L1200,120 L0,120 Z"
            fill="#7dd3fc"
            opacity="0.5"
          >
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="M0,0 C400,80 800,30 1200,90 L1200,120 L0,120 Z; M0,0 C300,100 900,10 1200,100 L1200,120 L0,120 Z; M0,0 C400,80 800,30 1200,90 L1200,120 L0,120 Z"
            />
          </path>
          <path
            d="M0,0 C500,90 700,20 1200,100 L1200,120 L0,120 Z"
            fill="#38bdf8"
            opacity="0.7"
          >
            <animate
              attributeName="d"
              dur="14s"
              repeatCount="indefinite"
              values="M0,0 C500,90 700,20 1200,100 L1200,120 L0,120 Z; M0,0 C300,70 900,30 1200,80 L1200,120 L0,120 Z; M0,0 C500,90 700,20 1200,100 L1200,120 L0,120 Z"
            />
          </path>
        </svg>
      </div>
      
      <div className="relative isolate px-6 pt-0 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 blur-3xl opacity-30"
          style={{
            background: "linear-gradient(270deg, #38bdf8, #6366f1, #0ea5e9)",
            backgroundSize: "600% 600%",
            animation: "gradientShift 15s ease infinite",
          }}
        />
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-48 text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-black sm:text-7xl">
            Transform Your Learning Experience
          </h1>
          <p className="mt-8 text-lg font-medium text-black sm:text-xl/8 leading-relaxed" 
             style={{ minHeight: "4.5rem", whiteSpace: "normal", overflow: "hidden" }}>
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link className="btn" to="/upload">Get started</Link>
            <Link className="link font-semibold text-black text-sm/6" to="/about">
              Learn More <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Try Prompt Examples Section
          <div className="mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              ⚡ Try AI Assistant Examples
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {examples.map((example, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    className="w-full text-left bg-gradient-to-r from-indigo-500 to-purple-600 p-5 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300"
                    onClick={() => handlePromptClick(index)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <FaRobot className="text-xl mt-1 flex-shrink-0" />
                      <h3 className="text-base font-semibold leading-relaxed">
                        {example.prompt}
                      </h3>
                    </div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {selectedIndex === index && showResponse && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                      >
                        <div className="p-4">
                          <div className="flex gap-3 items-start">
                            <FaRobot className="text-indigo-500 mt-1 text-lg flex-shrink-0" />
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {typedAnswer}
                              {typedAnswer.length < examples[selectedIndex].response.length && (
                                <span className="inline-block w-0.5 h-4 bg-gray-400 animate-pulse ml-0.5" />
                              )}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 -z-10 overflow-hidden leading-none">
        <svg
          className="w-full h-[150px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z" fill="#6366f1" opacity="0.3">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" 
                     values="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z; M0,0 C200,80 1000,30 1200,90 L1200,120 L0,120 Z; M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z" />
          </path>
          <path d="M0,0 C400,80 800,30 1200,90 L1200,120 L0,120 Z" fill="#38bdf8" opacity="0.5">
            <animate attributeName="d" dur="12s" repeatCount="indefinite" 
                     values="M0,0 C400,80 800,30 1200,90 L1200,120 L0,120 Z; M0,0 C300,100 900,10 1200,100 L1200,120 L0,120 Z; M0,0 C400,80 800,30 1200,90 L1200,120 L0,120 Z" />
          </path>
          <path d="M0,0 C500,90 700,20 1200,100 L1200,120 L0,120 Z" fill="#0ea5e9" opacity="0.7">
            <animate attributeName="d" dur="14s" repeatCount="indefinite" 
                     values="M0,0 C500,90 700,20 1200,100 L1200,120 L0,120 Z; M0,0 C300,70 900,30 1200,80 L1200,120 L0,120 Z; M0,0 C500,90 700,20 1200,100 L1200,120 L0,120 Z" />
          </path>
        </svg>
      </div>
    </div>
  );
}