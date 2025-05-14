import { useNavLinks } from "./contexts/ExploreContext";
import { Link } from "react-router-dom";
type NavLinkProps = {
  className?: string;
};
export default function NavLinks({ className }: NavLinkProps) {
  const navLinks = useNavLinks().map((link, index) => (
    <Link
      to={link.path}
      key={index}
      className={`hover:text-teal-400 transition ${className}`}
    >
      {link.name}
    </Link>
  ));
  return <>{navLinks}</>;
}
