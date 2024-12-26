const Hero = () => {
  return (
    <>
      <section className="relative w-full mt-5">
        <div
          className="w-full h-[500px] overflow-hidden rounded-3xl"
          style={{
            backgroundImage: `url(https://ideogram.ai/assets/image/lossless/response/EmpmkofUSHeUtlti83AdBg)`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-85 rounded-3xl"></div>
        </div>
        <div className="absolute inset-0 w-[80%] flex flex-col items-center justify-start text-center text-white px-4 pt-32 mx-auto md:w-[68%]">
          {/* Hero Title */}
          <h1 className="text-3xl w-[80%] font-bold leading-tight md:text-5xl mb-8">
            Search for reliable home services near you.
          </h1>

          {/* Search Bar */}
          <div className="relative flex items-center w-full max-w-xl mb-5">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-full rounded-full bg-white text-black focus:outline-none md:px-6 md:py-4"
            />
            {/* Search Button inside the input */}
            <button className="absolute right-[-2px] top-0 bottom-0 px-4 bg-primaryColor text-white rounded-r-full hover:bg-secondaryColor">
              <i className="ri-search-line text-2xl"></i>
            </button>
          </div>
          {/* brands logo */}
        </div>
        {/* <div className="flex items-center w-full justify-center">
          <div className="w-[100px] overflow-hidden p-3">
            <i class="ri-tools-fill"></i>
            <p>Plumbering</p>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default Hero;
