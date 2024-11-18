import React, { useState } from 'react'

import OtpInput from 'react-otp-input';
import Banner from '../../components/Banner/Banner';
import AuthBanner from '../../components/Banner/AuthBanner';
import GlobalOTPInput from './_components/GlobalOTPInput';
function SendOtp() {
    const [otp, setOtp] = useState<string>('');


    return (
        <div className='bg-custom-gradient '>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-10 items-center min-h-screen gap-20 lg:gap-28">
                <div className="px-5 md:px-0 mx-auto mt-5 w-full">
                    <div className="space-y-1 mb-8">
                        <h1 className="text-2xl lg:text-3xl mb-3">Email Sent</h1>
                        <p className="text-xs text-gray-500">
                            Thank you. <br />
                            Please check your inbox for verification code sent to example@email.com
                        </p>
                    </div>
                    <div className='flex flex-col items-center mb-10'>
                        {/* <OtpInput
                            value={otp}
                            onChange={handleChange}
                            numInputs={6}
                            renderInput={(props, index) => (
                                <input
                                    {...props}
                                    style={{
                                        width: '45px',
                                        height: '45px',
                                        margin: '0 10px',
                                        fontSize: '16px',
                                        borderRadius: '4px',
                                        border: `1px solid ${hasError ? 'red' : 'lightgray'}`,
                                        outline: 'none',
                                        textAlign: 'center',
                                    }}
                                />
                            )}
                        /> */}
                        <GlobalOTPInput />
                    </div>
                    <button type="submit" className="bg-black mb-3 hover:shadow-md text-white text-xs font-semibold py-2 px-4 rounded focus:outline-none w-full">
                        Verify
                    </button>
                    <p className="text-center text-xs text-gray-500">
                        Didn’t receive the code? <span className='text-app-primary cursor-pointer hover:underline'>Send again</span>
                    </p>
                </div>
                <AuthBanner />
            </div>

        </div>
    )
}

export default SendOtp
