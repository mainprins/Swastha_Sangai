import React from 'react'

const Navbar = () => {
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
                <a className="btn btn-error btn-soft shadow-none">Logout</a>
            </div>
        </div>
    )
}

export default Navbar