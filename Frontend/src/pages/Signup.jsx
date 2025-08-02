import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
const Signup = () => {
    const [ShowPassword, SetShowPassword] = useState(false);
    const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('')
  const[Error,seterror]=useState('')
  const [data, setData] = useState({
        username: "",
        email : "",
        password : "",
        confirm_password : ""
    })
  const [error, setError] = useState("");
  const nevigate=useNavigate()
  
    const handleSubmit = async(e) =>{
        
        e.preventDefault()
      if (data.password !== data.confirm_password) {
        setError("Password do not match!");
        return;
       }
       
        try {
          const response = await axios.post('http://127.0.0.1:8000/register/', {
            username: data.username,
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password
          },
            {
            headers: { "Content-Type": "application/json" }
          });
          
          console.log(data)
          console.log(response)
          setMessage("Registration successfully ")
        
          setError("");
            nevigate("/")
          
        } catch (error) {
          seterror(error.response?.data?.message || "Registration failed");
        }
      }
  return (
    <section className="relative h-screen w-full flex flex-wrap items-center justify-start bg-[url('./images/agri-image.jpg')] bg-cover bg-center ">
      <div className="bg-slate-200 md-pt-20 p-10 rounded-lg ml-40 shadow-lg w-full max-w-sm mt-20">
        <div className="flex justify-center items-center mb-6">
          <img src="icon.png" alt="Logo" className="h-14 w-16" />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold">Sign Up</h1>
          <Link 
          to={'/'} 
          className="text-red-600 text-sm underline">
            Have an account
          </Link>
        </div>
        {message && <div className="text-blue-500 text-center p-2">{message}</div>}
        {Error && <div className="text-red-500 text-center p-2">{Error}</div>}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label>
              User Name:
            </label>
            <input
              type="text"
              name='username'
              value = {data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
              className="w-full rounded-lg p-2 outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label>
              Email:
            </label>
            <input
              type="email"
              name='email'
              value = {data.email}
              onChange={(e)=>setData({...data,email:e.target.value})}
              required
              className="w-full rounded-lg p-2 outline-none"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-4">
            <label>
              Password:
            </label>
            <div className="flex bg-white ">
            <input
              type={ShowPassword ? "text" : "password"}
              name='password'
              value = {data.password}
              onChange={(e)=>setData({...data,password:e.target.value})}
              required
              className="w-full rounded-lg p-2 bg-transparent outline-none"
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

          <div className="mb-4">
            <label>
              Confirm Password:
            </label>
            <div className="flex bg-white">
            <input
              type={showconfirmPassword ? "text" : "password"}
              name='confirmPassword'
                value={data.confirm_password}
                onChange={(e) => setData({ ...data, confirm_password:e.target.value})}
              required
              className="w-full rounded-lg p-2 outline-none bg-transparent"
              placeholder="Confirm your password"
            />
            <div className="cursor-pointer p-2" onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                <span>
                    {
                        showconfirmPassword ? (
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

          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
          

        </form>
        <div className="my-4 text-center text-gray-600">OR</div>
        <button className="w-full border border-gray-400 flex items-center justify-center py-2 rounded-lg hover:bg-gray-100">
          <FcGoogle className="h-5 w-5 mr-2"/>
          Sign in with Google
        </button>
      </div>
    </section>
  );
};

export default Signup;
