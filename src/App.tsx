import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Empty from "./Empty";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className="my-4"></div>
      <Footer />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/empty" element={<Empty />} />
        <Route path="*" element={<p className="bg-red-700">Error 404</p>} />
      </Routes>
    </>
  );
}

export default App;
