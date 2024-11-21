import React, { useState } from 'react'

import OtpInput from 'react-otp-input';
import Banner from '../../components/Banner/Banner';
import AuthBanner from '../../components/Banner/AuthBanner';
import Button from '../../components/global-components/Button';
function SendOtp() {
    const [otp, setOtp] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);
    const openMailbox = () => {
        window.location.href = "mailto:";
      };
    const handleChange = (value: string) => {
        setOtp(value);

        // Example validation: Check if OTP has the correct number of digits
        if (value.length !== 6) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    };
    return (
        <div className='bg-custom-gradient '>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-10 items-center min-h-screen gap-20 lg:gap-28">
                <div className="px-5 md:px-0 mx-auto mt-5 w-full">
                    <div className="space-y-1 mb-8">
                        <h1 className="text-2xl lg:text-3xl mb-3">Email Sent</h1>
                        <p className="text-xs text-gray-500">
                            Thank you, check your email for instructions to reset your password
                        </p>
                    </div>

                    <Button type='button' onClick={openMailbox} children={"Open Email Box"} fullWidth={true} radius='sm' size='sm' className="shadow-md mb-3 bg-black text-white" />
                    {/* <p className="text-center text-xs text-gray-500">
                        Didn’t receive an email? <span className='text-app-primary cursor-pointer hover:underline'>Resend</span>
                    </p> */}
                </div>
                <AuthBanner />
            </div>

        </div>
    )
}

export default SendOtp
