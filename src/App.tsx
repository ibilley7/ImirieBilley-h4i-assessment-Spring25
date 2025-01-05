import { BrowserRouter, Routes, Route} from "react-router-dom";

// Importing components
import Form from "./components/form";

// Importing pages

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
