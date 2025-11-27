import React, { useContext, useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios"
import { toast } from "react-toastify";

export default function LoginPage() {
  const { backendUrl, setIsLoggedIn } = useContext(AuthContext);
  const [state, setState] = useState('Sign Up');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const res = await axios.post(backendUrl + '/api/auth/signup', { fullName, email, password });
        setIsLoggedIn(true);
        navigate('/');
        toast.success(res?.data?.message);
      } else {
        console.log(state);


        const res = await axios.post(backendUrl + '/api/auth/login', { email, password });
        setIsLoggedIn(true);
        navigate('/');
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }


  }




  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-900 via-stone-800 to-stone-900 p-4">
      <div className="w-full max-w-md bg-stone-800/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-stone-700">

        <div className="flex flex-col items-center mb-6">
          <h2 className="font-semibold text-white tracking-wide text-4xl">
            <span className="font-space-grotesk">
              <span className="font-extralight">Swastha</span>
              <span className="text-yellow-400 font-thi">Sangai</span>
            </span>
          </h2>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {state === 'Sign Up' && (<>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-stone-300">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              />
            </div>
          </>)}



          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-stone-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-stone-300">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-stone-400 hover:text-white"
              >
                {showPassword ? <FaEye /> : <FaRegEyeSlash />}
              </span>
            </div>
             {state !== 'Sign Up' && <label className="block mt-3 text-sm font-medium text-stone-300 hover:underline cursor-pointer" onClick={()=>{navigate('/reset-password')}}>Forgot password?</label>
          }
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-warning w-full rounded-xl shadow-md font-semibold hover:scale-[1.02] transition-all"
          >
            {state}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-stone-400">
          
          {state === "Sign Up" ? "Already have an account? " : "Don't have an account? "}
          <button onClick={() => { state === "Sign Up" ? setState("Log In") : setState("Sign Up") }} className="text-yellow-400 hover:underline">
            {state === "Sign Up" ? "Login" : "Signup"}
          </button>
         
        </p>

      </div>
    </div>
  );
}
