import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
export default function MyMovie() {
  const { textID } = useParams();
  type Movie = {
    poster_path: string;
    tagline: string;
    title: string;
    release_date: string;
    genres: { id: number; name: string }[];
    runtime: string;
    overview: string;
    vote_average: number;
  };
  const [movie, setMovie] = useState<Movie>({
    poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    tagline: "",
    title: "",
    release_date: "",
    genres: [],
    runtime: "0h 0m",
    overview: "",
    vote_average: 0,
  });
  useEffect(() => {
    const savedMovies = localStorage.getItem("movie");
    const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];
    const movie = savedMoviesArray.find(
      (item: { id: string }) => item.id === textID
    );
    setMovie(movie);
  }, [textID]);
  return (
    <div
      className=" bg-darkColor text-gray-300 text-center sm:text-start flex flex-col sm:flex-row items-start px-4
     justify-between gap-6  py-4"
    >
      {movie.poster_path && (
        <div className=" ">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            className=" object-cover rounded-t screen-height"
          />
          <p
            className="bg-gray-400 text-black rounded-b-md p-2.5  text-sm max-w-[289.55px] break-words
  "
          >
            {movie.tagline}
          </p>
        </div>
      )}
      <div className="w-full sm:w-1/2   pt-10 space-y-2">
        <h1 className="text-3xl font-bold pb-2.5">{movie.title}</h1>
        <p>
          {movie.release_date} . {movie.genres}.{" "}
          {` ${Math.floor(Number(movie.runtime) / 60)}h ${
            Number(movie.runtime) % 60
          }m`}
        </p>
        <p>Rating: {movie.vote_average}</p>
        <div>
          <h2 className="text-xl font-bold pt-20">Overview :</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
