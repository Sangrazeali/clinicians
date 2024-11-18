import React, { useState } from 'react'
import Banner from '../../components/Banner/Banner'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthBanner from '../../components/Banner/AuthBanner';
import Input from '../../components/global-components/Input';
function ForgetPassword() {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });
    const handleSubmit = (values: { email: string; password: string }) => {
        console.log('Form Values:', values);
    };
    return (
        <div className='bg-custom-gradient ' >
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-10 items-center min-h-screen gap-28">
                <div className="px-5 md:px-0 mx-auto mt-5 w-full">
                    <div className="space-y-1 mb-8">
                        <h1 className="text-2xl lg:text-3xl">
                            Forgot Your Password
                        </h1>
                        <p className="text-xs text-gray-500">
                            Please provide the email address linked to your account for password reset instructions.
                        </p>
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, handleChange, handleBlur, values }) => (
                            <Form className="space-y-5">
                                <Input
                                    label="Email"
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errorMessage={errors.email && touched.email ? errors.email : ''}
                                />
                                <button type="submit" className="bg-black mb-3 hover:shadow-md text-white text-xs font-semibold py-2 px-4 rounded focus:outline-none w-full">
                                    Send Password Reset Link
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <AuthBanner />
            </div>
        </div>
    )
}

export default ForgetPassword
