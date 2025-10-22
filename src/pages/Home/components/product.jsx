import React from "react";
import Footer from "@/layout/Footer";

const products = [
  {
    title: "Document Q&A Assistant",
    description: "Ask questions directly from any uploaded document using AI.",
    points: [
      "Live document understanding",
      "Source-based answers",
      "Supports PDFs, DOCX, TXT"
    ],
    bg: "bg-pink-100",
    icon: "📄"
  },
  {
    title: "Smart Concept Explainer",
    description: "Break down complex topics into simple explanations.",
    points: [
      "Plain language toggle",
      "Technical vs simplified view",
      "Visual explanation ready"
    ],
    bg: "bg-yellow-100",
    icon: "🧠"
  },
  {
    title: "Generate Study Packs",
    description: "Create flashcards, summaries, and revision sheets automatically.",
    points: [
      "Flashcard builder",
      "Bullet-pointed summaries",
      "Quick revision tools"
    ],
    bg: "bg-green-100",
    icon: "📚"
  },
  {
    title: "Auto Quiz Builder",
    description: "Turn your documents into customizable quizzes.",
    points: [
      "MCQ & Short Answer",
      "Difficulty control",
      "Exportable formats"
    ],
    bg: "bg-blue-100",
    icon: "❓"
  },
  {
    title: "Knowledge Tracker",
    description: "Track learning progress and get AI-based suggestions.",
    points: [
      "Topic mastery insights",
      "Personalized improvements",
      "Downloadable reports"
    ],
    bg: "bg-purple-100",
    icon: "📈"
  },
  {
    title: "Audio Tutor Mode",
    description: "Convert text into podcasts or narrated lessons.",
    points: [
      "Natural TTS voices",
      "Playback controls",
      "Learning on the go"
    ],
    bg: "bg-orange-100",
    icon: "🎧"
  },
  {
    title: "Connected Sources Mode",
    description: "Combine your files with external trusted sources for smarter answers.",
    points: [
      "RAG-powered retrieval",
      "Confidence scoring",
      "Trusted source filters"
    ],
    bg: "bg-teal-100",
    icon: "🔗"
  },
];

export default function ProductPage() {
  return (
    <div className="w-full bg-[#0c1b2a]">        
      <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-white to-blue-100 py-24 px-8">
        {/* ASU Logo Header */}
        <div className="absolute top-4 left-8">
          <a href="https://www.asu.edu/" target="_blank" rel="noopener noreferrer" className="-m-1.5 p-1.5">
            <span className="sr-only">Arizona State University</span>
            <img
              alt="ASU Logo"
              src="src/assets/ASU-Logo.png"
              className="h-12 w-auto transform transition-transform duration-200 hover:-translate-y-1 drop-shadow-md"
            />
          </a>
        </div>

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Powerful AI-Powered Learning Tools
        </h2>
        <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Explore the products that enable document understanding, quiz creation, learning personalization, and much more.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {products.map((product, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow-md hover:shadow-xl hover:scale-105 hover:brightness-105 transition-transform duration-300 p-6 border border-gray-100 ${product.bg}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{product.icon}</span>
                <h3 className="text-2xl font-semibold text-gray-800">{product.title}</h3>
              </div>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <button className="mt-4 text-sm text-white hover:underline">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
