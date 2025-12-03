import React, { useEffect } from 'react'
import ProfileHeader from '../components/userFitnessProfile/ProfileHeader'

const FitnessProfile = () => {
    useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return (
    <div className='bg-background px-6 py-4'>
     <ProfileHeader />
    </div>
  )
}

export default FitnessProfile