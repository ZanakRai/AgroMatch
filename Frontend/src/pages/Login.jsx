import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
const Login = () => {
  const [ShowPassword, SetShowPassword] = useState(false);
  const [data, setData] = useState({
    username : "",
    password : ""

  })
  const [message,setmessage]=useState("")
 
  const nevigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(data)
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', data, );
      console.log(response)
      if (response.data.success){

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('email', response.data.email)
        setmessage("Login Successfully")
        nevigate('/home');
      }
      else {
        setmessage(response.data.message)
      }
      
     
      
    }
    catch (error)
    {
      setmessage("Unable to login");
    }
  }


  return (
    <section className="relative h-screen w-full flex flex-wrap items-center justify-start  bg-[url('./images/agri-image.jpg')] bg-cover bg-center ">
      <div className="bg-slate-200 md-pt-20 p-6 ml-40 rounded-lg shadow-lg w-full h-[80vh] max-w-sm mt-30">
        <div className="flex justify-center items-center mb-6">
          <img src="icon.png" alt="Logo" className="h-14 w-16" />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold">Sign In</h1>
          <Link 
          to={'/signup'} 
          className="text-red-600 text-sm underline">
            Create an account
          </Link>

        </div>
        {message && <div className="text-blue-500 text-center p-2">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>
              Username:
            </label>
            <input
              type="text"
              name='username'
              value = {data.username}
              onChange={(e)=>setData({...data,username:e.target.value})}
              className="w-full rounded-lg p-2 outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label>
              Password:
            </label>
            <div className="flex mb-4 bg-white items-center">
              <input
                type={ShowPassword ? "text": "password"}
                name='password'
                value = {data.password}
                onChange={(e)=>setData({...data,password:e.target.value})}
                className=" w-full rounded-lg p-2 outline-none"
                placeholder="Enter your password"
              />
                <div className="cursor-pointer p-2" onClick={()=>SetShowPassword((prev)=>!prev)}>
                  <span>
                    {
                      ShowPassword ? (
                      <FaEyeSlash />
                      )
                      :
                      (
                      <FaEye />
                      )
                    }  
                  </span>
                </div>
                </div>
          </div>
          <button
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <a href="#" className="text-red-600 text-sm underline">
            Forgot password?
          </a>
        </div>
        <div className="my-4 text-center text-gray-600">OR</div>
        <button className="w-full border border-gray-400 flex items-center justify-center py-2 rounded-lg hover:bg-gray-100">
          <FcGoogle className="h-5 w-5 mr-2"/>
          Sign in with Google
        </button>
      </div>
    </section>
  );
};

export default Login;
