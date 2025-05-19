import { useState } from "react";
import "./App.css";
import Button from "./Button";
import NavLinks from "./NavLinks";
import { useFormData } from "./contexts/FormContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearch } from "./contexts/SearchContext";

const movieSchema = z.object({
  id: z.string().refine(
    (id) => {
      const saved = localStorage.getItem("movie");
      const existing = saved ? JSON.parse(saved) : [];
      return !existing.some((m: { id: string }) => m.id === id);
    },
    {
      message: "ID already exists",
    }
  ),
  title: z.string().min(1, "Title is required"),
  genres: z.string().min(1, "Genre is required"),
  tagline: z.string().min(1, "Tagline is required"),
  release_date: z.string(),
  runtime: z.coerce.number().min(20, "Time must be at least 20 min"),
  vote_average: z.coerce.number().min(1).max(10),
  overview: z.string().min(10),
  poster_path: z.string(),
});

export default function Header() {
  const { search, setSearch } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      id: "",
      title: "",
      genres: "",
      tagline: "",
      release_date: "",
      runtime: 0,
      vote_average: 0,
      overview: "",
      poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    },
  });

  const formSections = useFormData().map((section, index) => (
    <div key={index}>
      <div className="flex justify-between">
        <label htmlFor={section.labelName} className="w-28">
          {section.labelName}
        </label>
        :
        <input
          required
          type={section.type}
          id={section.labelName}
          placeholder={section.placeHolder}
          autoFocus={index === 0}
          className={`focus-visible:ring-orange-500 outline-none border border-teal-500 rounded-md bg-gray-200 focus-visible:border-orange-500 transition-all ${
            section.type === "date" ? "w-48 px-0" : "px-1"
          }`}
          {...register(section.state as keyof z.infer<typeof movieSchema>)}
        />
      </div>
      {errors[section.state as keyof typeof errors]?.message && (
        <p className="text-red-500 text-sm">
          {errors[section.state as keyof typeof errors]?.message as string}
        </p>
      )}
    </div>
  ));

  const onSubmit = (data: z.infer<typeof movieSchema>) => {
    const existing = localStorage.getItem("movie");
    const allMovies = existing ? JSON.parse(existing) : [];
    allMovies.push(data);
    localStorage.setItem("movie", JSON.stringify(allMovies));
    setShowModal(false);
    reset();
  };

  function handleNewMovie() {
    setShowModal(true);
  }

  return (
    <header className="text-white shadow-md sticky top-0 z-50 bg-darkColor">
      <div className="container mx-auto py-3 px-1 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500">My Watchlist</h1>
        <nav className="hidden md:flex space-x-6 text-gray-300">
          <NavLinks />
        </nav>
        <div className="hidden md:flex space-x-4">
          <input
            type="text"
            title="search for movie by name"
            placeholder="Search movie by name"
            className="rounded-xl bg-teal-600 focus-visible:outline focus-visible:outline-orange-500 focus-visible:outline-offset-2px text-black px-1 me-1.5"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleNewMovie}>New Movie</Button>
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
        className={`fixed top-0 right-0 h-screen min-w-1/5 bg-darkColor text-gray-300 z-50 px-4 py-20 space-y-4 shadow-lg transform duration-300 ease-in-outtransition-transform md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NavLinks className="block" handleCleck={() => setIsOpen(false)} />
        <div className="flex flex-col space-y-3 pt-6">
          <input
            type="text"
            title="search for movie by name"
            placeholder="Search movie by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl text-black bg-teal-400 focus-visible:outline focus-visible:outline-orange-500 focus-visible:outline-offset-2px p-2"
          />
          <Button onClick={handleNewMovie}>New Movie</Button>
        </div>
      </div>

      {showModal && (
        <div className="text-black centerTheElement bg-white z-55 p-5 space-y-2 rounded-xl shadow-2xl outline-none shadow-teal-400 focus-visible:ring focus-visible:ring-orange-500">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl text-center font-bold text-teal-500">
              Create New Movie
            </h1>
            <button
              className="cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              ❌
            </button>
          </div>
          <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
            {formSections}
            <label htmlFor="overview" className="block">
              Overview :
            </label>
            <textarea
              id="overview"
              {...register("overview")}
              className="focus:border-orange-500 outline-none border border-teal-500 rounded-md bg-gray-200 w-full min-h-28"
            />
            {errors.overview && (
              <p className="text-red-500 text-sm">{errors.overview.message}</p>
            )}
            <input
              type="submit"
              value="Add The Movie"
              className="mx-auto block text-white bg-teal-500 rounded-2xl hover:text-inherit px-2 py-1"
            />
          </form>
        </div>
      )}
    </header>
  );
}
