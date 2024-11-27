import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { ToastContainer } from 'react-toastify';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import ServicesPage from "./pages/services";


function App() {
  return (
    <Router>
      {/* ToastContainer placed here to make it accessible throughout the app */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/signin" element={<Signin />} /> {/* Sign in page route */}
        <Route path="/signup" element={<Signup />} /> {/* Sign Up page route */}
        <Route path="/services" element={<ServicesPage />} />

      </Routes>
    </Router>

  );
}

export default App;
