import banner from "../assets/images/banner-2.jpg";

const Home = () => {
  return (
    <div
      style={{
        background: `url(${banner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
      className="w-full h-[100vh] flex justify-center items-center p-8 lg:p-32"
    >
      <div className="container mx-auto ">
        <h1 className="text-center text-4xl mb-6 lg:w-8/12 mx-auto lg:text-7xl font-bold">
          Managing Your Task Just Got a Lot Easier
        </h1>
        <p className="w-9/12 mx-auto text-center text-xl font-semibold text-gray-700">
          Stay organized and boost productivity with our smart task management
          solution! Easily track, prioritize, and complete tasks efficiently.
          With intuitive features and seamless collaboration, managing your
          workload has never been easier. Simplify your workflow and achieve
          more effortlessly!
        </p>
        <div className="flex justify-center items-center mt-8">
         <button className="bg-blue-800 cursor-pointer text-white py-3 px-8 rounded-md font-semibold">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
