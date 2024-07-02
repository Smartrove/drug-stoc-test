import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookdetails" element={<BookDetails />} />
      </Routes>
    </>
  );
}

export default App;
