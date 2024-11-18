import React from 'react'
import { PrimaryPlus, UploaDoc, UserAvatar } from '../../../images/index'
import SignaturePad from './SignaturePad'
import Button from '../../../components/global-components/Button'

function AgreementForm() {
    const [file, setFile] = React.useState<string | null | undefined>(null);;
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            console.log(e.target.files);
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    }
    return (
        <div className="w-full">
            <form action="" className='border-b pb-5'>
                <div className='grid grid-cols-[1fr_5fr] gap-5'>
                    <div className='mx-auto'>
                        <div className=" bg-white">
                            <label htmlFor="upload" className="flex flex-col text-xs items-center gap-2 cursor-pointer">
                                {file !== null ? <img src={file} alt="" /> :
                                    (<>
                                        <div className='relative border-3 rounded-full p-5 border-gray-200'>
                                            <img src={UserAvatar} alt="" />
                                            <div className='absolute -top-1 right-0'>
                                                <img src={PrimaryPlus} alt="" />
                                            </div>
                                        </div>

                                        <span className="text-black font-medium">Add Profile Photo</span>
                                    </>)
                                }

                            </label>
                            <input id="upload" type="file" onChange={handleChange} className="hidden" />
                        </div>

                    </div>
                    <div className='space-y-10'>
                        <div className="mb-4 text-xs">
                            <label className="block text-gray-700 text-xs font-semibold mb-2" htmlFor="username">
                                Full Name
                            </label>
                            <input className="block appearance-none w-full border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="username" type="text" placeholder="Enter Full Name" />
                        </div>
                        <div className="mb-4 text-xs">
                            <label className="block text-gray-700 text-xs font-semibold mb-2" htmlFor="username">
                                Email
                            </label>
                            <input className="block appearance-none w-full border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="username" type="text" placeholder="Enter Email" />
                        </div>
                        <div className="mb-4 text-xs w-full">
                            <label className="block text-gray-700 text-xs font-semibold mb-2" htmlFor="username">
                                Select Document
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option>Passport</option>
                                    <option>Emirates ID</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className='mb-4 flex flex-wrap md:flex-nowrap gap-2'>
                            <div className="bg-white">
                                <div className="">
                                    <div className="md:flex">
                                        <div className="w-[150px]">
                                            <div className="relative h-full p-10 text-center cursor-pointer text-xs rounded-lg border-dotted border-2 border-gray-200 flex justify-center items-center">

                                                <div className="absolute">

                                                    <div className="flex flex-col items-center gap-2">
                                                        <img src={UploaDoc} className='w-8' alt="" />
                                                        <span className="block text-black font-normal">Upload Frontside of Document</span>
                                                    </div>
                                                </div>

                                                <input type="file" className="h-full w-full opacity-0" name="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white">
                                <div className="">
                                    <div className="md:flex">
                                        <div className="w-[150px]">
                                            <div className="relative h-full p-10 text-center cursor-pointer text-xs rounded-lg border-dotted border-2 border-gray-200 flex justify-center items-center">

                                                <div className="absolute">

                                                    <div className="flex flex-col items-center gap-2">
                                                        <img src={UploaDoc} className='w-8' alt="" />
                                                        <span className="block text-black font-normal">Upload Backside of Document</span>
                                                    </div>
                                                </div>

                                                <input type="file" className="h-full w-full opacity-0" name="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap md:flex-nowrap gap-2'>
                            <div className="mb-4 text-xs w-full">
                                <label className="block text-gray-700 text-xs font-semibold mb-2" htmlFor="username">
                                    Country
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                        <option>New Mexico</option>
                                        <option>Missouri</option>
                                        <option>Texas</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 text-xs w-full">
                                <label className="block text-gray-700 text-xs font-semibold mb-2" htmlFor="username">
                                    Phone Number
                                </label>
                                <input className="block appearance-none w-full border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="username" type="number" placeholder="Enter Email" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className='py-5 border-b '>
                <div className='h-[190px] overflow-auto scrollbar-hide'>
                    <p className='text-gray-500 text-xs text-justify'> Lorem  </p>  </div>
            </div>
            <div className='py-5'>
                <p className='font-semibold'>Signature</p>
                <p className='text-xs text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                <SignaturePad />
            </div>
            <div className="flex items-center space-x-2 rounded p-2  accent-app-primary">
                <input type="checkbox" id="checkagreement" name="checkagreement" className="h-4 w-4 rounded border-gray-300 text-app-primary shadow-sm focus:border-app-primary focus:ring-none focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400" />
                <label htmlFor="checkagreement" className="flex w-full space-x-2 text-xs text-gray-500"> I confirmed that i uploaded valid documents and my Signature </label>
            </div>
            <div className='flex items-center justify-end py-5 space-x-5'>
                <Button children="Submit" className="w-[150px] shadow-md bg-[#F8971D] text-white" radius="sm" size='sm' />
            </div>
        </div>
    )
}

export default AgreementForm
