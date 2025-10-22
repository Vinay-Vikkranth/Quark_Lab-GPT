import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaX,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          <a href="#" className="text-gray-400 hover:text-gray-200">
            About
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            Blog
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            Press
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            Accessibility
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            Partners
          </a>
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          <a href="#" className="text-gray-400 hover:text-gray-200">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            <FaXTwitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            <FaGithub className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            <FaYoutube className="w-6 h-6" />
          </a>
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-400">
          © 2025 RAG Assistant, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
