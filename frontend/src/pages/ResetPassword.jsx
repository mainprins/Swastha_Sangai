import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const { backendUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }
    if (isOtpSent) {
      try {
        const res = await axios.post(backendUrl + '/api/auth/reset-otp', { email, otp, newPassword });
        toast.success(res.data?.message);
        setIsOtpSent(false);
        navigate('/');
      } catch (error) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message);
      }
    } else {
      toast.error("Otp has not been sent to email.")
    }
  }

  const handleEmailSubmit = async (e) => {
    if (email === '') {
      return toast.error("Please provide the email first.")
    }
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const res = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      toast.success(res.data?.message);
      setIsOtpSent(true);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
      setIsOtpSent(false);
    }
  }

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-900 via-stone-800 to-stone-900 p-4">
      <div className="w-full max-w-md bg-stone-800/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-stone-700">

        <div className="flex flex-col items-center mb-3">
          <h2 className="font-semibold text-white tracking-wide text-4xl">
            <span className="font-space-grotesk">
              <span className="font-extralight">Reset</span>
              <span className="text-yellow-400 font-thi">Password</span>
            </span>
          </h2>
        </div>
        {isOtpSent ? <form onSubmit={handleOtpSubmit} className='flex flex-col justify-center items-center gap-4'>
          <label className="block text-sm font-medium text-stone-300">Enter the 6 digit code sent to your email id.</label>
          <div className='flex flex-row gap-3'>
            {[...Array(6)].map(() => (<>
              <input
                type="text"
                onChange={(e) => handleOtpChange(e.target.value, index)}
                id={`otp-${index}`}
                className="w-13 px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              />
            </>))}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
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

          </div>
          <button
            type="submit"
            className="btn btn-warning w-full rounded-xl shadow-md font-semibold hover:scale-[1.02] transition-all"
          >
            Submit
          </button>

        </form>
          : <form onSubmit={handleEmailSubmit} className='flex flex-col justify-center items-center gap-4'>
            <label className="block text-sm font-medium text-stone-300">Enter your email id.</label>
            <input
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }

              }
              className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="btn btn-warning w-full rounded-xl shadow-md font-semibold hover:scale-[1.02] transition-all"
            >
              Submit
            </button>

          </form>
        }
      </div>
    </div>
  )
}

export default ResetPassword