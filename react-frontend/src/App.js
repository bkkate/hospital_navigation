import "./App.css";
import { Route, Routes } from "react-router-dom";
import DisplayPage from "./pages/DisplayPage";
import InputPage  from "./pages/InputPage";
import LinksPage  from "./pages/LinksPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/display/:id" element={<DisplayPage />} />
        <Route path="/links" element={<LinksPage />} />
      </Routes>
    </div>
  );
}

export default App;
