import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  const {backendUrl} = useContext(AuthContext);
  const navigate = useNavigate();
  const [otp,setOtp] = useState('');
  const handleSubmit = ()=>{
    try {
      e.preventDefault();
      const res = axios.post(backendUrl+'/api/auth/verify-email',{otp})
      toast.success(res.data?.message);
      navigate('/');
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-900 via-stone-800 to-stone-900 p-4">
      <div className="w-full max-w-md bg-stone-800/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-stone-700">

        <div className="flex flex-col items-center mb-3">
          <h2 className="font-semibold text-white tracking-wide text-4xl">
            <span className="font-space-grotesk">
              <span className="font-extralight">Verify</span>
              <span className="text-yellow-400 font-thi">Email</span>
            </span>
          </h2>
        </div>

        <form onSubmit={handelSubmit} className='flex flex-col justify-center items-center gap-4'>
          <label className="block text-sm font-medium text-stone-300">Enter the 6 digit code sent to your email id.</label>
          <div className='flex flex-row gap-3'>
            {[...Array(6)].map(() => (<>
              <input
                type="text"
                onChange={(e) => {
                  console.log("Hi");
                }

                }
                className="w-13 px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              />
            </>))}

          </div>
          <button
            type="submit"
            className="btn btn-warning w-full rounded-xl shadow-md font-semibold hover:scale-[1.02] transition-all"
          >
            Submit
          </button>

        </form>

      </div>
    </div>
  )
}

export default EmailVerify