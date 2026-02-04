import { SearchIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { MdCreate, MdDelete, MdNotifications } from 'react-icons/md'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const DonateMain = () => {
    const navigate = useNavigate();
    const { userData, backendUrl } = useContext(AuthContext);

    return (
        <div className='w-full h-full flex px-10 py-10 flex-col'>
            <div id="top" className='w-full h-15 bg-foreground/10 rounded-xl p-3 flex justify-between mb-10'>
                <div className='w-80 h-full rounded-full bg-foreground/20 flex gap-6 items-center justify-center px-4 py-2 mb-4'>
                    <input type="text" placeholder='Search for Donors' className='outline-none  w-full' />
                    <SearchIcon />
                </div>
                <div className='flex items-center  gap-6'>
                    <MdNotifications size={20} />
                    <Avatar className="size-6 relative overflow-visible cursor-pointer" onClick={() => { navigate('/home/fitness-profile') }}>
                        <AvatarImage
                            src={
                                userData?.imageFile
                                    ? `${backendUrl}/profile-pics/${userData.imageFile}`
                                    : "/profile_pic_placeholder.jpg"
                            }
                            className="rounded-full"
                        />


                        <AvatarFallback>profileImage</AvatarFallback>
                    </Avatar>

                </div>
            </div>
            <div id="bottom" className='h-[95%] flex flex-col gap-5'>
                <div id="top" className='flex justify-between w-full items-center gap-2'>
                    <div className='flex flex-col gap-2'>
                        <span className='from-accent-foreground text-4xl font-semibold'>Donation <span className='text-transparent bg-linear-to-bl from-primary via-priamry/20 to-foreground bg-clip-text'>Posts</span></span>
                        <p className='text-muted-foreground w-100'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, quis.
                        </p>
                    </div>
                    <div>
                        <span className='flex gap-2 items-center px-4 py-2 bg-primary/20 text-primary rounded-full cursor-pointer hover:bg-primary/30 transition-all duration-500'>
                            <MdCreate />
                            <span>Create Donation</span>
                        </span>
                    </div>

                </div>
                <div id="bottom" className='flex gap-3 w-full h-full'>
                    <div id="left" className='w-2/4 h-full flex flex-col gap-3 py-3 px-5 rounded-xl bg-foreground/10'>
                        <span className='text-2xl tracking-[0.1em] text-foreground/80 font-space-grotesk'>_ Your Posts</span>
                        <div className='main_list flex flex-col p-2 overflow-scroll gap-3 h-[85%]'>
                            <div id="post" className='flex w-full bg-foreground/20 rounded-xl p-3 gap-3'>
                                <div id="left" className='w-1/2'>

                                </div>
                                <div id="right" className='flex flex-col gap-5'>
                                    <div id="top" className='flex flex-col gap-2'>
                                        <span className='text-xl'>Donation 1</span>
                                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, dolores.</span>
                                    </div>
                                   <div id="bottom" className='flex items-center gap-3'>
                                        <span className='flex gap-2 w-30 items-center px-4 py-2 bg-primary/20 text-primary rounded-full cursor-pointer hover:bg-primary/30 transition-all duration-500'>
                                            <MdCreate />
                                            <span>Edit</span>
                                        </span>
                                        <span className='flex gap-2 w-30 items-center px-4 py-2 bg-primary/20 text-primary rounded-full cursor-pointer hover:bg-primary/30 transition-all duration-500'>
                                            <MdDelete />
                                            <span>Delete</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div id="right" className='w-2/4 h-full flex flex-col gap-3 py-3 px-5 rounded-xl bg-foreground/10'>
                        <span className='text-2xl tracking-[0.1em] text-foreground/80 font-space-grotesk'>_ Donations</span>
                        <div className='main_list flex flex-col p-2 overflow-scroll gap-3 h-[85%]'>
                            <div id="post" className='flex w-full bg-foreground/20 rounded-xl p-3 gap-3'>
                                <div id="left" className='w-1/2'>

                                </div>
                                <div id="right" className='flex flex-col gap-5'>
                                    <div id="top" className='flex flex-col gap-2'>
                                        <span className='text-xl'>Donation 1</span>
                                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, dolores.</span>
                                    </div>
                                    <div id="bottom">
                                        <span className='flex gap-2 w-30 items-center px-4 py-2 bg-primary/20 text-primary rounded-full cursor-pointer hover:bg-primary/30 transition-all duration-500'>
                                            <MdCreate />
                                            <span>Apply</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonateMain