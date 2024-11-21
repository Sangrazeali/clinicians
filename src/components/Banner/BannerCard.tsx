import React from 'react'
import {  BannerCharachter } from '../../images'
import { useAppContext } from '../../context-api'

function BannerCard() {
    const {state} = useAppContext();

    return (
        <div className='rounded-2xl bg-black'>
            <div className='w-full flex items-center justify-between px-10'>
                <div className='space-y-4 py-5'>
                    <h1 className='text-md md:text-lg lg:text-xl text-orange-400'>Welcome Back <span className='bg-default-200/60 text-white rounded-lg px-5 py-1 ml-3 capitalize text-sm md:text-md'>{state?.dashboard_data?.userName}</span></h1>
                    <p className='text-sm md:text-md text-white'>This Platform Aims To Allow You Complete Management Of Your Assets. Analyze Your Situation And Make Decisions For Your Business.</p>
                </div>
                <img src={BannerCharachter} className='w-[350px] pt-7 hidden sm:block' alt="" />
            </div>
        </div>
    )
}

export default BannerCard
