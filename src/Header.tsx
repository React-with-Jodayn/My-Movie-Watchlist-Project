import { useState, type ChangeEvent } from "react";
import "./App.css";
import Button from "./Button";
import NavLinks from "./NavLinks";
import { useFormData } from "./contexts/FormContext";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formInputs, setFormInputs] = useState({
    id: "",
    title: "",
    genres: "",
    tagline: "",
    release_date: "",
    runtime: 0,
    vote_average: "",
    overview: "",
    poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
  });
  const formSections = useFormData().map((section, index) => {
    return (
      <div className="flex justify-between" key={index}>
        <label htmlFor={String(index)} className="w-28 ">
          {section.labelName}
        </label>
        :
        <input
          type={section.type}
          id={String(index)}
          required
          autoFocus={index === 0}
          placeholder={section.placeHolder}
          value={formInputs[section.state as keyof typeof formInputs]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFormInputs({ ...formInputs, [section.state]: e.target.value });
          }}
          className="focus-visible:ring-orange-500	outline-none border border-teal-500 rounded-md bg-gray-200 px-0.5 focus-visible:border-orange-500 transition-all"
        />
      </div>
    );
  });
  function handelNewMovie() {
    setShowModal(true);
  }

  return (
    <header className=" text-white shadow-md sticky top-0 z-50 bg-darkColor">
      <div className="container mx-auto  py-3 px-1  flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500">My Watchlist</h1>
        <nav className="hidden md:flex space-x-6 text-gray-300">
          <NavLinks />
        </nav>
        <div className="hidden md:flex space-x-4">
          <Button className="rounded-xl hover:text-teal-400 border-gray-500">
            Login
          </Button>
          <Button
            className=" bg-teal-500 hover:text-black hover:bg-teal-400 "
            onClick={handelNewMovie}
          >
            Create New Movie
          </Button>
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
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-0 right-0 h-screen min-w-1/5 bg-darkColor text-gray-300 z-50 px-4 py-20 space-y-4 shadow-lg 
          transform  duration-300 ease-in-outtransition-transform md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <NavLinks className="block" />
        <div className="flex flex-col space-y-3 pt-6">
          <Button className="rounded-xl hover:text-teal-400 border-gray-500">
            Login
          </Button>
          <Button
            className=" bg-teal-500  hover:text-black hover:bg-teal-400 "
            onClick={handelNewMovie}
          >
            Create New Movie
          </Button>
        </div>
      </div>

      {showModal && (
        <div
          className="text-black centerTheElement bg-white  p-5 space-y-2 rounded-xl shadow-2xl outline-none shadow-teal-400   
             focus-visible:ring focus-visible:ring-orange-500 "
        >
          <h1 className="text-3xl text-center font-bold text-teal-500">
            Create New Movie
          </h1>
          <form
            className=" space-y-1 "
            onSubmit={(e) => {
              e.preventDefault();
              if (Number(formInputs.runtime) < 20) {
                window.alert("unvalid please enter time more than 20 min");
                return;
              }
              if (Number(formInputs.vote_average) > 10) {
                window.alert("unvalid please enter valid rate out of ten");
                return;
              }
              const existing = localStorage.getItem("movie");
              const allMovies = existing ? JSON.parse(existing) : [];
              allMovies.push(formInputs);
              localStorage.setItem("movie", JSON.stringify(allMovies));
              //to save array of movies
              setShowModal(false);
              setFormInputs({
                id: "",
                title: "",
                genres: "",
                tagline: "",
                release_date: "",
                runtime: 0,
                vote_average: "",
                overview: "",
                poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
              });
            }}
          >
            {formSections}
            <label htmlFor="textarea" className="block">
              Overview :
            </label>
            <textarea
              name="overView"
              id="textarea"
              value={formInputs.overview}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                setFormInputs({ ...formInputs, overview: event.target.value });
              }}
              className=" focus:border-orange-500	outline-none border border-teal-500 rounded-md bg-gray-200 w-full min-h-28 "
            />
            <input
              type="submit"
              value="Add The Movie"
              className="   mx-auto block text-white  bg-teal-500 rounded-2xl hover:text-inherit px-2 py-1 "
            />
          </form>
        </div>
      )}
    </header>
  );
}
