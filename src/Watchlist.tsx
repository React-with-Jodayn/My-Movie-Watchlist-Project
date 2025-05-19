import "./App.css";
import { useEffect, useState } from "react";
import { type Movie } from "./contexts/MovieContext";
import ViewMovies from "./ViewMovies";
import { useSearch } from "./contexts/SearchContext"; //

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const { search } = useSearch(); //
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    setWatchlist(savedWatchlist ? JSON.parse(savedWatchlist) : []);
  }, []);

  const filteredWatchlist = watchlist.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-height bg-darkColor justify-items-center  text-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 justify-center">
      {filteredWatchlist.length === 0 ? (
        <p className="text-center col-span-full text-gray-400 text-lg">
          No movies found.
        </p>
      ) : (
        filteredWatchlist.map((movie, index) => (
          <ViewMovies movie={movie} key={index} />
        ))
      )}
    </div>
  );
}
