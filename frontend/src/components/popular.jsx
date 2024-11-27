import React from "react";

const Popular = () => {
  return (
    <>
      <section id="popular-service" className="my-10 text-gray-900">
        <h1 className="text-3xl font-semibold leading-tight md:text-5xl text-start">
          Popular Services <i class="ri-arrow-right-up-line"></i>
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 ">
          <div
            id="card"
            className="p-4 bg-slate-300 shadow-xl rounded-xl text-start space-y-4 transition-all ease-in-out duration-300 hover:bg-secondaryColor hover:text-white cursor-pointer"
          >
            <i class="ri-home-4-fill text-5xl"></i>
            <p className="text-2xl font-bold">Home Cleaning Services</p>
            <ul className="text-sm font-normal space-y-2">
              <li>Regular cleaning</li>
              <li>Deep cleaning</li>
              <li>Carpet cleaning</li>
              <li>Window washing</li>
              <li>Post-renovation cleaning</li>
            </ul>
          </div>
          <div
            id="card"
            className="p-4 bg-slate-300 shadow-xl rounded-xl text-start space-y-4 transition-all ease-in-out duration-300 hover:bg-secondaryColor hover:text-white cursor-pointer"
          >
            <i class="ri-tools-fill text-5xl"></i>
            <p className="text-2xl font-bold">Repairs and Maintenance</p>
            <ol className="text-sm font-normal space-y-2">
              <li>Plumbing repairs (leaks, clogs, pipe replacements)</li>
              <li>
                Electrical repairs (wiring issues, light fixtures, switches)
              </li>
              <li>Appliance repairs (washing machines, refrigerators, etc.)</li>
            </ol>
          </div>
          <div
            id="card"
            className="p-4 bg-slate-300 shadow-xl rounded-xl text-start space-y-4 transition-all ease-in-out duration-300 hover:bg-secondaryColor hover:text-white cursor-pointer"
          >
            <i class="ri-home-9-fill text-5xl"></i>
            <p className="text-2xl font-bold">Renovation and Remodeling</p>
            <ol className="text-sm font-normal space-y-2">
              <li>Home renovation (kitchen, bathroom, living room upgrades)</li>
              <li>Flooring installation (tiles, hardwood, carpets)</li>
              <li>
                Room partitioning (e.g., converting a room into an office)
              </li>
            </ol>
          </div>
          <div
            id="card"
            className="p-4 bg-slate-300 shadow-xl rounded-xl text-start space-y-4 transition-all ease-in-out duration-300 hover:bg-secondaryColor hover:text-white cursor-pointer"
          >
            <i class="ri-printer-cloud-fill text-5xl"></i>
            <p className="text-2xl font-bold">Gardening and Landscaping</p>
            <ol className="text-sm font-normal space-y-2">
              <li>Lawn care (mowing, trimming)</li>
              <li>Planting and garden setup</li>
              <li>Tree pruning</li>
              <li>Irrigation setup and maintenance</li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
};

export default Popular;
