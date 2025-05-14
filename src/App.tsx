import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import Genres from "./Genres";
import Watchlist from "./Watchlist";
import Movie from "./Movie";
import MyMovie from "./MyMovie";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Watchlist" element={<Watchlist />} />
          <Route path="Genres" element={<Genres />} />
          <Route path="About" element={<About />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="mymovie/:textID" element={<MyMovie />} />
        </Route>
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center bg-darkColor ">
              <h1 className="text-4xl font-bold text-red-700">Error 404</h1>
              <Link to="/">
                <h3 className="text-white hover:text-teal-400 block px-3">
                  {" "}
                  Go back Home
                </h3>{" "}
              </Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
