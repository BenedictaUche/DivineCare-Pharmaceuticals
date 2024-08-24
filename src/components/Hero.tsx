import { Search } from "lucide-react";

const Hero = () => {
    return (
      <section
        className="bg-cover bg-center p-8 h-[30rem] relative pt-40"
        style={{ backgroundImage: "url('/images/medical-background-banner.jpg')" }}
      >
        <div className="container mx-auto text-center p-6 rounded z-50">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Find Product</h1>
          <div className="flex justify-center align-middle mt-10">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 rounded-l w-full md:w-1/2 h-12"
            />
            <button className="bg-[#009e7f] text-white p-2 rounded-r w-14 flex justify-center items-center">
              <Search size={24} className=""/>
            </button>
          </div>
        </div>
        <div className="overlay"></div>
      </section>
    );
  };

  export default Hero;
