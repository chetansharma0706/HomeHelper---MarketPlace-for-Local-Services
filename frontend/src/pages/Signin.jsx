import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/authContexts";
import axios from 'axios'
import Loader from "../components/loader";


const Signin = () => {

  const [isLoading, setIsLoading] = useState(false)
  const { setIsLogin, setUserDetails } = useContext(AuthContext); // Access global state functions
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    // Save user to local storage
    const user = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", user, { withCredentials: true });
      if (response.data.success) {
        setIsLogin(true);
        setUserDetails(response.data.user);
        navigate("/");
        toast.success("Login successfully!");
        setIsLoading(false)
      } else {
        // Executes when the request completes successfully, but the server responds with an error status or message.
        toast.error(response.data.message);
        console.error("Login failed:", response.data.message);
        setIsLoading(false)
      }

    } catch (error) {
      // Executes when there’s an unexpected issue that prevents the request from completing.
      // For example, network issues, server is down, 
      setIsLoading(false)
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        toast.error("Invalid credentials");
        console.error("Login failed:", error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        // The request was made but no response received
        toast.error("No response received:", error.request);
        console.error("No response received:", error.request);
      } else {
        // Something else happened while setting up the request
        toast.error("Error setting up request:", error.message);
        console.error("Error setting up request:", error.message);
      }
    }

  };


  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="min-h-screen w-full flex bg-gray-200">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8 p-8 bg-white shadow-lg rounded-lg">
            <div className="space-y-2 text-center">
              <div className="pt-2 my-8">
                <Link to="/" className="text-4xl font-extrabold text-gray-800">
                  <span className="text-primaryColor">
                    <i className="ri-home-smile-line"></i> House
                  </span>
                  Helper
                </Link>
              </div>
              <div className="p-5 text-center">
                <h1 className="text-xl text-center font-semibold tracking-tight">Log in to your Account</h1></div>
              {/* <button className="flex items-center justify-center w-full py-2 px-4 my-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                <p className="font-semibold">Google</p>
              </button> */}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              {/* <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div> */}
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="flex flex-col rounded-md shadow-sm space-y-2">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input id="email-address" name="email" type="email" onChange={handleChange} autoComplete="email" required className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primaryColor focus:border-primaryColor focus:z-10 sm:text-sm" placeholder="Email address" />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input id="password" name="password" type="password" onChange={handleChange} autoComplete="current-password" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primaryColor focus:border-primaryColor focus:z-10 sm:text-sm" placeholder="Password" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="#" className="font-medium text-primaryColor hover:text-secondaryColor underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primaryColor hover:bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor">
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-primaryColor hover:text-secondaryColor underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin