import { createContext, useContext } from "react";

type NavLink = {
  name: string;
  path: string;
  additionalFeatures?: string;
};

const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "Watchlist", path: "Watchlist" },
  { name: "Genres", path: "Genres" },
  { name: "About", path: "About" },
];

const NavLinksContext = createContext<NavLink[]>(navLinks);

export const useNavLinks = () => useContext(NavLinksContext);

export const NavLinksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <NavLinksContext.Provider value={navLinks}>
    {children}
  </NavLinksContext.Provider>
);
