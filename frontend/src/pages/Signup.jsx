import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/authContexts';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/loader';

const Signup = () => {

    const { setIsLogin, setUserDetails } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "", // Added phone number state
        description: "", // Added description state
    });

    const [isSeller, setIsSeller] = useState(false); // Track seller toggle

    // Handle change for input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value // Dynamically update the form fields
        }));
    };

    const handleSellerToggle = () => {
        setIsSeller((prevState) => !prevState);
        // Clear description if user toggles seller off
        if (isSeller) {
            setFormData((prevState) => ({
                ...prevState,
                description: "",
            }));
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const newUser = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            description: isSeller ? formData.description : "",
            isSeller,
        };
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", newUser, { withCredentials: true });
            if (response.data.success) {
                setIsLogin(true);
                setUserDetails(response.data.user);
                navigate("/");
                toast.success("Account created successfully!");
                setIsLoading(false)
            } else {
                // Executes when the request completes successfully, but the server responds with an error status or message.
                toast.error('Signup failed:', response.data.message);
                setIsLoading(false)
            }

        } catch (e) {
            // Executes when there’s an unexpected issue that prevents the request from completing.
            // For example, network issues, server is down, 
            toast.error('Error during signup:', e);
            setIsLoading(false)
        }


    };

    if (isLoading) {
        return <Loader />;
    }


    return (
        <>
            <div className="min-h-screen w-full flex bg-gray-200">
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
                                <h1 className="text-xl text-center font-semibold tracking-tight">Create a New Account</h1>
                            </div>

                            {/* Google Sign In */}
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

                        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
                            <div className="flex flex-col rounded-md shadow-sm space-y-2">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="sr-only">Full Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        autoComplete="name"
                                        required
                                        className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primaryColor focus:border-primaryColor focus:z-10 sm:text-sm"
                                        placeholder="Full Name"
                                    />
                                </div>
                                {/* Email */}
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                        className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primaryColor focus:border-primaryColor focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        type="password"
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primaryColor focus:border-primaryColor focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label htmlFor="phone" className="sr-only">Phone number</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primaryColor focus:border-primaryColor focus:z-10 sm:text-sm"
                                        placeholder="Phone number"
                                    />
                                </div>
                            </div>

                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                                </div>
                            </div> */}

                            {/* Seller Toggle */}
                            <div className="mt-3">
                                <label class="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" class="sr-only peer" checked={isSeller} onChange={handleSellerToggle} />
                                    <div class="relative w-11 h-6 rounded-full bg-secondaryColor peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-lime-500"></div>
                                    <span class="ms-3 text-lg font-semibold text-gray-900">Activate as a Seller Account</span>
                                </label>

                            </div>
                            {/* Seller Description (conditionally shown) */}
                            {isSeller && (
                                <div>
                                    <label htmlFor="description" className="sr-only">Short Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Short description about you"
                                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg text-gray-900"
                                    />
                                </div>
                            )}

                            <div>
                                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primaryColor hover:bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor">
                                    Create Account
                                </button>
                            </div>
                        </form>

                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/signin" className="font-medium text-primaryColor hover:text-secondaryColor underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
