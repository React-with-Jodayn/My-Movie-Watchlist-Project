import { useContext, createContext } from "react";

type LearnLink = {
  name: string;
  path: string;
};

const learnLinks: LearnLink[] = [
  { name: "Blog", path: "Blog" },
  { name: "Ebooks", path: "Ebooks" },
  { name: "Guides", path: "Guides" },
  { name: "Templates", path: "Templates" },
];
const LearnLinksContext = createContext<LearnLink[]>(learnLinks);
export const useLearnLinks = () => useContext(LearnLinksContext);
export const LearnLinksProvider = ({
  Children,
}: {
  Children: React.ReactNode;
}) => (
  <LearnLinksContext.Provider value={learnLinks}>
    {Children}
  </LearnLinksContext.Provider>
);
