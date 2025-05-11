import "./App.css";
import { Link } from "react-router-dom";
import { useNavLinks } from "./contexts/ExploreContext";
import { useSolutionLinks } from "./contexts/SolutionContext";
import { useLearnLinks } from "./contexts/LearnContext";
import { useIcons } from "./contexts/IconContext";

export default function Footer() {
  const navLinks = useNavLinks().map((link, index) => (
    <li key={index}>
      <Link to={link.path} className="hover:text-teal-400 transition">
        {" "}
        {link.name}
      </Link>
    </li>
  ));

  const solutionLinks = useSolutionLinks().map((link, index) => (
    <li key={index}>
      <Link to={link.path} className="hover:text-teal-400 transition">
        {link.name}
      </Link>
    </li>
  ));
  const learnLinks = useLearnLinks().map((link, index) => (
    <li key={index}>
      <Link to={link.path} className="hover:text-teal-400 transition">
        {link.name}
      </Link>
    </li>
  ));
  const icons = useIcons().map((icon, index) => (
    <a
      href="#"
      className={`hover:${icon.color} text-xl transition`}
      key={index}
    >
      {icon.type}
    </a>
  ));
  return (
    <footer className="bg-darkColor text-gray-300 py-7 text-center md:text-start ">
      <div className="container mx-auto px-1 grid grid-cols-1 md:grid-cols-5  sm:grid-cols-3 gap-8">
        <div className=" sm:col-span-3 md:col-span-1">
          <h2 className="text-orange-500 text-2xl font-bold mb-3">
            My Watchlist
          </h2>
          <p className="text-sm">
            Your personal space to track and save movies.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2">{navLinks}</ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Solutions </h3>
          <ul className="space-y-2">{solutionLinks}</ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Learn</h3>
          <ul className="space-y-2">{learnLinks}</ul>
        </div>

        <div className="sm:col-span-3 md:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 justify-center md:justify-start">
            {icons}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        &copy; 2025 My Watchlist. All rights reserved.
      </div>
    </footer>
  );
}
