import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import "./App.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-darkColor text-gray-300 py-7 ">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-orange-500 text-2xl font-bold mb-3">
            My Watchlist
          </h2>
          <p className="text-sm">
            Your personal space to track and save movies.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/empty" className="hover:text-teal-400 transition">
                {" "}
                Home
              </Link>
            </li>
            <li>
              <Link to="/empty" className="hover:text-teal-400 transition">
                Watchlist
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-teal-400 transition">
                Genres
              </a>
            </li>
            <li>
              <Link to="/empty" className="hover:text-teal-400 transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-sky-500 text-xl transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-600 text-xl transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-blue-700 text-xl transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        &copy; 2025 My Watchlist. All rights reserved.
      </div>
    </footer>
  );
}
