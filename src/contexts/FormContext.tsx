import { createContext, useContext } from "react";

type FormDataType = {
  labelName: string;
  placeHolder: string;
  state: string;
  type: "text" | "number" | "hidden" | "date";
};
const formData: FormDataType[] = [
  {
    labelName: "Movie ID",
    placeHolder: "Enter id like movie name",
    state: "id",
    type: "text",
  },
  {
    labelName: "Title",
    placeHolder: "The Godfather",
    state: "title",
    type: "text",
  },
  {
    labelName: "Genre",
    placeHolder: "Drama, Crime",
    state: "genres",
    type: "text",
  },
  {
    labelName: "Tagline",
    placeHolder: "An offer you can't refuse.",
    state: "tagline",
    type: "text",
  },
  {
    labelName: "Time in min",
    placeHolder: "175",
    state: "runtime",
    type: "number",
  },
  {
    labelName: "Release date",
    placeHolder: "1972-03-14",
    state: "release_date",
    type: "date",
  },
  {
    labelName: "Rate out of 10",
    placeHolder: "8.687",
    state: "vote_average",
    type: "number",
  },
];

const FormDataContext = createContext<FormDataType[]>(formData);

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <FormDataContext.Provider value={formData}>
    {children}
  </FormDataContext.Provider>
);
