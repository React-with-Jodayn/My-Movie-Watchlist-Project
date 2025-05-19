import { useEffect, useState } from "react";
import axios from "axios";
import { type Movie } from "./contexts/MovieContext";
import ViewMovies from "./ViewMovies";
import { useSearch } from "./contexts/SearchContext";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

export default function Home() {
  const { search } = useSearch();

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_MOVIE_API_URL_BASE;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  //
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      try {
        const parsed = JSON.parse(savedWatchlist);
        const ids = parsed.map((movie: Movie) => movie.id);
        setCheckedIds(ids);
      } catch (err) {
        console.error("Error parsing watchlist:", err);
      }
    }
  }, [movies]);

  //
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );

        const fetched = response.data.results
          .filter((movie: Movie) => movie.adult === false)
          .map((movie: Movie) => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            checked: checkedIds.includes(movie.id),
          }));

        const saved = localStorage.getItem("movie");
        const parsed = saved ? JSON.parse(saved) : [];

        const combined = [...fetched, ...parsed].map((movie: Movie) => ({
          ...movie,
          checked: checkedIds.includes(movie.id),
        }));

        setMovies(combined);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, [movies]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-height bg-darkColor justify-items-center text-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 justify-center">
      {filteredMovies.map((movie, index) => (
        <ViewMovies movie={movie} key={index}>
          <div
            onClick={(e) => {
              e.preventDefault();
              const existing = localStorage.getItem("watchlist");
              const watchlistMovies = existing ? JSON.parse(existing) : [];

              const alreadyExists = watchlistMovies.some(
                (m: Movie) => m.id === movie.id
              );

              let updated;
              if (alreadyExists) {
                // delete
                updated = watchlistMovies.filter(
                  (m: Movie) => m.id !== movie.id
                );
              } else {
                // Add
                updated = [...watchlistMovies, movie];
              }

              localStorage.setItem("watchlist", JSON.stringify(updated));
            }}
            className="absolute top-1 right-0 text-xl text-white "
            title="Toggle Watchlist"
          >
            {movie.checked ? (
              <FaBookmark className="text-teal-400" />
            ) : (
              <FaRegBookmark />
            )}
          </div>
        </ViewMovies>
      ))}
    </div>
  );
}
