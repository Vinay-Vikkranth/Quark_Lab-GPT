import { useState, useEffect } from "react";
import { MegaphoneIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import bg1 from "@/assets/bg1.mp4";
import bg2 from "@/assets/bg2.mp4";
import bg3 from "@/assets/bg3.mp4";
import bg4 from "@/assets/bg4.mp4";

const videoList = [bg1, bg2, bg3, bg4];

export default function Features() {

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % videoList.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features" className="relative isolate bg-gray-50 min-h-screen pt-16 pb-24">
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        {videoList.map((video, index) => (
          <video
            key={index}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
              active === index ? "opacity-30" : "opacity-0"
            }`}
          />
        ))}
      </div>


      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <p className="mx-auto mt-2 text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
          Enhance your learning Experience
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 ">
          <div className="relative transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            <div className="absolute inset-px rounded-lg rounded-t-2xl bg-gradient-to-br from-teal-600 to-cyan-500 lg:rounded-l-[2rem] "></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)] ">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <div className="bg-white/25 inline-flex p-4 rounded-full">
                  <MicrophoneIcon className="w-10 aspect-[1/1] text-white" />
                </div>
                <p className="mt-8 text-2xl font-medium tracking-tight text-white max-lg:text-center">
                  Voice Interaction
                </p>
                <p className="mt-2 text-white/80">
                  Learn hands-free with voice commands. Ask questions, get
                  explanations, and test your knowledge using just your voice.
                </p>
                <div className="mt-8 text-white text-lg">
                  <ul className="px-3 list-['✓']">
                    <li className="px-4">Voice-to-text dictation</li>
                    <li className="px-4">Natural language processing</li>
                    <li className="px-4">Hands-free learning</li>
                  </ul>
                </div>
                <Link to="upload" className="block">
                  <button className="my-8 bg-white w-full text-cyan-500 text-lg font-medium rounded-lg py-2 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    Start Voice Mode
                  </button>
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg rounded-t-2xl shadow-sm ring-1 ring-black/5 lg:rounded-tr-lg lg:rounded-l-[2rem]"></div>
          </div>
          <div className="relative transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-cyan-500 to-sky-600"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <div className="bg-white/25 inline-flex p-4 rounded-full">
                  <MegaphoneIcon className="w-10 aspect-[1/1] text-white" />
                </div>
                <p className="mt-8 text-2xl font-medium tracking-tight text-white max-lg:text-center">
                  Podcast Generation
                </p>
                <p className="mt-2 text-white/80">
                  Convert your study materials into engaging audio podcasts.
                  Learn on the go with personalized educational content.
                </p>
                <div className="mt-8 text-white text-lg">
                  <ul className="px-3 list-['✓']">
                    <li className="px-4">Text-to-speech conversion</li>
                    <li className="px-4">Multiple voice options</li>
                    <li className="px-4">Downloadable MP3 files</li>
                  </ul>
                </div>
                <Link to="upload" className="block">
                  <button className="my-8 bg-white w-full text-sky-600 text-lg font-medium rounded-lg py-2 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    Create Podcast
                  </button>
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 "></div>
          </div>
          <div className="relative transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <div className="bg-white/25 inline-flex p-4 rounded-full">
                  <ChartBarIcon className="w-10 aspect-[1/1] text-white" />
                </div>
                <p className="mt-8 text-2xl font-medium tracking-tight text-white max-lg:text-center">
                  Visualize Data
                </p>
                <p className="mt-2 text-white/80">
                  Transform complex information into clear, interactive
                  visualizations. Understand difficult concepts with visual
                  learning aids.
                </p>
                <div className="mt-8 text-white text-lg">
                  <ul className="px-3 list-['✓']">
                    <li className="px-4">Interactive charts & graphs</li>
                    <li className="px-4">Mind maps & concept diagrams</li>
                    <li className="px-4">Exportable visualizations</li>
                  </ul>
                </div>
                <Link to="upload" className="block">
                  <button className="my-8 bg-white w-full text-blue-600 text-lg font-medium rounded-lg py-2 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    Create Visualization
                  </button>
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
