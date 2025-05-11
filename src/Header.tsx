import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { useNavLinks } from "./contexts/ExploreContext";
import Button from "./Button";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = useNavLinks().map((link, index) => (
    <Link to={link.path} key={index} className="hover:text-teal-400 transition">
      {link.name}
    </Link>
  ));
  const navLinks2 = useNavLinks().map((link, index) => (
    <Link
      to={link.path}
      key={index}
      className="hover:text-teal-400 transition block"
    >
      {link.name}
    </Link>
  ));
  return (
    <header className=" text-white shadow-md sticky top-0 z-50 bg-darkColor">
      <div className="container mx-auto  py-3 px-1  flex justify-between items-center">
        {" "}
        <h1 className="text-2xl font-bold text-orange-500">My Watchlist</h1>
        <nav className="hidden md:flex space-x-6 text-gray-300">{navLinks}</nav>
        <div className="hidden md:flex space-x-4">
          <Button className="rounded-xl hover:text-teal-400 border-gray-500">
            Login
          </Button>
          <Button className=" bg-teal-500 text-black hover:bg-teal-400 ">
            {" "}
            Sign Up
          </Button>
        </div>
        <button
          className="md:hidden text-teal-500 text-2xl hover:border-2 focus:border-2 border-teal-500 rounded-md transition p-0.5 cursor-pointer z-55"
          aria-label="Toggle Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-0 right-0 h-screen min-w-1/5 bg-darkColor text-gray-300 z-50 px-4 py-20 space-y-4 shadow-lg 
          transform  duration-300 ease-in-outtransition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {navLinks2}
        <div className="flex flex-col space-y-3 pt-6">
          <Button className="rounded-xl hover:text-teal-400 border-gray-500">
            Login
          </Button>
          <Button className=" bg-teal-500 text-black hover:bg-teal-400 ">
            {" "}
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
