import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 flex h-screen w-full flex-wrap relative overflow-hidden py-16 px-6 md:px-16 text-gray-800 mt-0 mb-0"
    >
      <div className="max-w-7xl mx-auto text-center flex flex-col justify-center h-full">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 animate__animated animate__fadeIn">
          About AgroMatch: Your Smart Crop Recommendation System
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
          AgroMatch is a cutting-edge crop recommendation system designed to help farmers and agricultural enthusiasts make data-driven decisions. By simply inputting key parameters like location, soil type, and climate, AgroMatch provides personalized crop suggestions tailored to your environment.
        </p>
        <div className="text-center mb-12">
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-3xl mx-auto">
            Alongside crop suggestions, AgroMatch also integrates a smart chatbot that assists you in gaining valuable agricultural knowledge. From crop care tips to soil management practices, our chatbot is designed to provide expert advice and answer your questions in real-time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
