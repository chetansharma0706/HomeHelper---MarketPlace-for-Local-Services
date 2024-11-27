// HowItWorks.js
import React from 'react';

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-16 bg-slate-300 rounded-xl">
            <div className="container mx-auto text-center">
                <h2 className="text-gray-900 text-3xl font-bold mb-4">How HouseHelper Works</h2>
                <p className="text-lg mb-10 text-gray-700 max-w-xl mx-auto">
                    It's simple to get started with HouseHelper! Follow these easy steps to connect with service providers or offer your services.
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-12">
                    {/* Step 1 */}
                    <div className="max-w-xs p-6 bg-white rounded-lg shadow-lg mx-auto">
                        <h2 className="text-2xl text-white font-bold bg-slate-900 rounded-full p-2 w-[50px] mx-auto mb-3">1</h2>
                        <h3 className="text-lg font-semibold my-2">Browse Providers</h3>
                        <p className="text-gray-600">
                            Homeowners can easily browse a list of trusted local service providers in their area, from cleaning to repairs, and more.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="max-w-xs p-6 bg-white rounded-lg shadow-lg mx-auto">
                        <h2 className="text-2xl text-white font-bold bg-slate-900 rounded-full p-2 w-[50px] mx-auto mb-3">2</h2>
                        <h3 className="text-xl font-semibold mb-2">Create a Profile</h3>
                        <p className="text-gray-600">
                            Service providers can sign up, create a profile, and list the services they offer. It's easy to get started!
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="max-w-xs p-6 bg-white rounded-lg shadow-lg mx-auto">
                        <h2 className="text-2xl text-white font-bold bg-slate-900 rounded-full p-2 w-[50px] mx-auto mb-3">3</h2>
                        <h3 className="text-xl font-semibold mb-2">Choose & Book</h3>
                        <p className="text-gray-600">
                            Homeowners can choose their desired service provider based on reviews, location, and services offered. Then, simply book a time!
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="max-w-xs p-6 bg-white rounded-lg shadow-lg mx-auto">
                        <h2 className="text-2xl text-white font-bold bg-slate-900 rounded-full p-2 w-[50px] mx-auto mb-3">4</h2>
                        <h3 className="text-xl font-semibold mb-2">Get the Service</h3>
                        <p className="text-gray-600">
                            Once the booking is confirmed, the service provider arrives at the scheduled time, ready to help you with your task!
                        </p>
                    </div>
                </div>

                {/* Call to Action Button */}
                <div className="mt-16">
                    <a href="#start-now" className="bg-primaryColor text-white px-6 py-3 rounded-lg shadow-lg hover:bg-secondaryColor transition duration-200">
                        Get Started Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
