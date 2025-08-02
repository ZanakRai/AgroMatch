import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";


import axios from "axios";
import { imageInfo } from "../imageInfo";

const Content = () => {
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorous, setPhosphorous] = useState('');
  const [potassium, setPotassium] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [soilPh, setSoilPh] = useState('');

  const [result, setResult] = useState('');
  const [message,setMessage]=useState('')

  const [showConfetti, setShowConfetti] = useState(false);

  const handleModel = async (event) => {
    event.preventDefault();

    const token=localStorage.getItem('token')
    if (!token) {
      setMessage("You must be log in first")
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/crop_prediction/', {
        nitrogen: Number(nitrogen),
        phosphorous: Number(phosphorous),  // Ensure consistency with backend key names
        potassium: Number(potassium),
        temperature: Number(temperature),
        humidity: Number(humidity),
        soilPh: Number(soilPh)
      }, { headers: { Authorization: `Token ${token}` } });
        console.log("crop pediction: ",response.data)
      // Axios automatically parses JSON, so use response.data
      
        setResult(response.data.crop);
        setShowConfetti(true)
     
      
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult("Failed to fetch prediction. Check console for details.");
    }
  };


  return (


    <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-300 pt-10 sm:p-20 lg:p-20">
      <div className=" mt-8 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Crop Recommendation </h1>
        <form onSubmit={handleModel} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nitrogen (N) Level */}
        <div className="w-full mb-4">
          <label className="block text-lg text-gray-700 font-semibold">Nitrogen (N) Level</label>
          <input
            type="number"
            value={nitrogen}
            onChange={(e)=>setNitrogen(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter Nitrogen level"
          />
        </div>
        
        {/* Phosphorus (P) Level */}
        <div className="w-full mb-4">
          <label className="block text-lg text-gray-700 font-semibold">Phosphorus (P) Level</label>
          <input
            type="number"
            value={phosphorous}
            onChange={(e)=>setPhosphorous(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter Phosphorus level"
          />
        </div>
        
        {/* Potassium (K) Level */}
        <div className="mb-4 w-full">
          <label className="block text-lg text-gray-700 font-semibold">Potassium (K) Level</label>
          <input
            type="number"
            value={potassium}
            onChange={(e)=>setPotassium(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter Potassium level"
          />
        </div>
        
        {/* Temperature */}
        <div className="mb-4 w-full">
          <label className="block text-lg text-gray-700 font-semibold">Temperature (°C)</label>
          <input
            type="number"
            value={temperature}
            onChange={(e)=>setTemperature(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter temperature"
          />
        </div>
        {/* Humidity */}
        <div className="mb-4 w-full" >
          <label className="block text-lg text-gray-700 font-semibold">Humidity</label>
          <input
            type="number"
            value={humidity}
            onChange={(e)=>setHumidity(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter Humidity"
          />
        </div>
        {/* Soil pH Level */}
        <div className="mb-4 w-full" >
          <label className="block text-lg text-gray-700 font-semibold">Soil pH Level</label>
          <input
            type="number"
            value={soilPh}
            onChange={(e)=>setSoilPh(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter soil pH"
          />
        </div>
        
          {/* Button */}
          <div className="col-span-1 sm:col-span-2 flex justify-center">
        <button
          type="submit" className="w-[300px] py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 transition-all"
        >
          Get Recommendations
            </button>
          </div>
        </form>
        {result && <div className="mt-4 p-2 text-2xl font-bold text-center text-gray-700">{`Suitable Crop: ${result}`}</div>}
        {/* Recommendations Section */}
        {/* <div className="flex flex-col justify-center items-center h-screen bg-blue-100 text-center">
          {showConfetti && <Confetti />}
          <h1 className="text-4xl font-bold text-green-600">🎉 Hurray! Congratulations! 🎉</h1>
          <p className="text-lg text-gray-700 mt-2">You did an amazing job! Keep it up! 🚀</p>
        </div> */}
        <div className="flex justify-center">
          {result && <div className="w-60 h-30 mt-4 ">
            <>
              {showConfetti && <Confetti />}
              <img src={imageInfo[result]} className="w-full h-full rounded-3xl object-cover hover:scale-105 shadow-lg" alt="recommended crop image" />
            </>
          </div>}
        </div>
      </div>
      
    </div>
  );
};

export default Content;