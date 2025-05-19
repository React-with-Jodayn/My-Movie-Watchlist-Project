import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export default function Movie() {
  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_MOVIE_API_URL_BASE;
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
    poster_path: "",
    tagline: "",
    title: "",
    release_date: "",
    genres: [],
    runtime: "0h 0m",
    overview: "",
    vote_average: 0,
  });
  useEffect(() => {
    axios
      .get(`${BASE_URL}/${id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const runTime: string = ` ${Math.floor(response.data.runtime / 60)}h ${
          response.data.runtime % 60
        }m`;
        setMovie({
          poster_path: response.data.poster_path,
          tagline: response.data.tagline,
          title: response.data.title,
          release_date: response.data.release_date,
          genres: response.data.genres,
          runtime: runTime,
          overview: response.data.overview,
          vote_average: response.data.vote_average,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
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
          {movie.release_date} .{" "}
          {movie.genres.map((genre) => genre.name).join(", ")} . {movie.runtime}
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
