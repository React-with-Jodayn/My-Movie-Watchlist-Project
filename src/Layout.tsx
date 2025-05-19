import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { NavLinksProvider } from "./contexts/ExploreContext";
export default function Layout() {
  return (
    <NavLinksProvider>
      {" "}
      <Header />
      <Outlet />
      <Footer />
    </NavLinksProvider>
  );
}
