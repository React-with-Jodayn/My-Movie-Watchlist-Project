import type React from "react";
import { type Movie } from "./contexts/MovieContext";
import { Link } from "react-router-dom";
export default function ViewMovies({
  movie,
  children,
}: {
  movie: Movie;
  children?: React.ReactNode;
}) {
  return (
    <Link to={Number(movie.id) ? `/movie/${movie.id}` : `/mymovie/${movie.id}`}>
      <div className="w-52 h-96  bg-gray-800 border cursor-pointer border-gray-200 rounded-lg p-0.5">
        <div>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              className="w-full h-72 object-cover rounded-t"
            />
          )}
        </div>
        <div className="p-2">
          <h2 className="font-bold pt-2 pb-1.5 truncate">{movie.title}</h2>
          <div className="relative">
            <p>{movie.release_date}</p>
            {children}
          </div>
        </div>
      </div>
    </Link>
  );
}
