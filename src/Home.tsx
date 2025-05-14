import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Home() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_MOVIE_API_URL_BASE;
  type Movie = {
    id: string;
    title: string;
    release_date: string;
    poster_path: string;
    adult: boolean;
  };
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => {
        const movies = response.data.results
          .filter((movie: Movie) => movie.adult === false)
          .map((movie: Movie) => {
            return {
              id: movie.id,
              poster_path: movie.poster_path,
              title: movie.title,
              release_date: movie.release_date,
            };
          });
        setMovies(movies);
        const savedMovies = localStorage.getItem("movie");
        if (savedMovies) {
          const parsed = JSON.parse(savedMovies);
          setMovies((prev) => [...prev, ...parsed]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const movieLists = movies.map((movie, index) => (
    <Link
      to={Number(movie.id) ? `/movie/${movie.id}` : `/mymovie/${movie.id}`}
      key={index}
    >
      <div className="w-52 h-96  bg-gray-800 border cursor-pointer border-gray-200 rounded-lg dark:border-gray-700   ">
        <div>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              className="w-full h-72 object-cover rounded-t"
            />
          )}
        </div>
        <div className="p-2">
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className="home-height bg-darkColor justify-items-center  text-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 justify-center">
      {movieLists}
    </div>
  );
}
