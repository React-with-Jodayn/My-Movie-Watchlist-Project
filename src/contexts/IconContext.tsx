import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useContext, createContext, type JSX } from "react";

type icon = { type: JSX.Element; color: string };
const icons: icon[] = [
  { type: <FaTwitter />, color: "text-sky-500" },
  { type: <FaFacebook />, color: "text-blue-600" },
  { type: <FaLinkedin />, color: "text-blue-700" },
];

const IconContext = createContext<icon[]>(icons);
export const useIcons = () => useContext(IconContext);
export const IconProvider = ({ children }: { children: React.ReactNode }) => (
  <IconContext.Provider value={icons}>{children}</IconContext.Provider>
);
