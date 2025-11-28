import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, backendUrl, setIsLoggedIn,userData } = useContext(AuthContext);

    const logoutHandler = async () => {
        try {
            const res = await axios.post(backendUrl + '/api/auth/logout');
            toast.success(res.data?.message);
            setIsLoggedIn(false);
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message);
        }
    }

    const sendVerifyOtp = async ()=>{
           try {
            const res = await axios.post(backendUrl + '/api/auth/send-verify-otp',{},{withCredentials:true});
            navigate('/email-verify');
            toast.success(res.data?.message);
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message);
        }
    }
    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                <a className="text-xl">SwasthaSangai</a>
            </div>
            <div className='flex gap-15 tracking-wider'>
                <span className='hover:text-accent transition-all duration-500 cursor-pointer'>Home</span>
                <span className='hover:text-accent transition-all duration-500 cursor-pointer'>About</span>
                <span className='hover:text-accent transition-all duration-500 cursor-pointer'>Contact</span>
            </div>
            <div className="navbar-end">
                <button className="btn btn-error btn-soft shadow-none" onClick={() => { isLoggedIn ? logoutHandler() : navigate('/login') }}>{isLoggedIn ? "Logout" : "Login"}</button>
                {isLoggedIn && !userData?.isAccountVerified && <button className="btn btn-error btn-soft shadow-none" onClick={() => {sendVerifyOtp()}}>verify</button>
                }

            </div>
        </div>
    )
}

export default Navbar