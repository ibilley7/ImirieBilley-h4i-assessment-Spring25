import { BrowserRouter, Routes, Route} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

// Importing pages
import LandingPage from "./pages/Landingpage/LandingPage";
import DisplayPage from "./pages/Displaypage/Displaypage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/display" element={<DisplayPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
