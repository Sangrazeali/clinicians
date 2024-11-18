import React from 'react'
import { BannerCharachter } from '../../images'

function AuthBanner() {
    return (
        <div className='hidden md:block rounded-2xl bg-black'>
            <div className='w-full flex flex-col items-center justify-between px-10'>
                <div className='space-y-4 py-10'>
                    <h1 className='text-md md:text-lg lg:text-xl text-orange-400'>Welcome In Journey Bridge</h1>
                    <p className='text-sm md:text-md text-white'>This Platform Aims To Allow You Complete Management Of Your Assets. <br /> <br /> Analyze Your Situation And Make Decisions For Your Business.</p>
                </div>
                <img src={BannerCharachter} className='w-[250px] pt-7 xxl:pt-32 hidden sm:block' alt="" />
            </div>
        </div>
    )
}

export default AuthBanner
