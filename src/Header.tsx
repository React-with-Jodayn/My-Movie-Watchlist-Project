import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" text-white shadow-md sticky top-0 z-50 bg-darkColor">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500">My Watchlist</h1>

        <nav className="hidden md:flex space-x-6 text-gray-300">
          <Link to="/empty" className="hover:text-teal-400 transition">
            Home
          </Link>
          <Link to="/empty" className="hover:text-teal-400 transition">
            Watchlist
          </Link>
          <Link to="/empty" className="hover:text-teal-400 transition">
            Genres
          </Link>
          <Link to="/empty" className="hover:text-teal-400 transition">
            About
          </Link>
        </nav>

        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 rounded-xl border border-gray-500 hover:text-teal-400 transition">
            Login
          </button>
          <button className="px-4 py-2 rounded-xl bg-teal-500 text-black hover:bg-teal-400 transition">
            Sign Up
          </button>
        </div>

        <button
          className="md:hidden text-teal-500 text-2xl hover:border-2 focus:border-2 border-teal-500 rounded-md transition p-0.5 cursor-pointer"
          aria-label="Toggle Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-gray-300 bg-[#1b1b1b]">
          <Link to="/empty" className="hover:text-teal-400 transition">
            Home
          </Link>
          <Link to="/empty" className="hover:text-teal-400 transition">
            Watchlist
          </Link>
          <Link to="/empty" className="hover:text-teal-400 transition">
            Genres
          </Link>
          <Link to="/empty" className="hover:text-teal-400 transition">
            About
          </Link>
          <div className="flex space-x-3 pt-3">
            <button className="flex-1 border border-gray-500 px-4 py-2 rounded-xl hover:text-teal-400 transition">
              Login
            </button>
            <button className="flex-1 bg-teal-500 text-black px-4 py-2 rounded-xl hover:bg-teal-400 transition">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
