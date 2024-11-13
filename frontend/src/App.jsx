import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/signin" element={<Signin />} /> {/* Sign in page route */}
        <Route path="/signup" element={<Signup />} /> {/* Sign Up page route */}

      </Routes>
    </Router>

  );
}

export default App;
