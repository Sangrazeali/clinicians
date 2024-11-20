import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthBanner from '../../components/Banner/AuthBanner';
import Input from '../../components/global-components/Input';
import Button from '../../components/global-components/Button';
import { useUserActions } from '../../context-api/actions';

function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const  {forgetPassword} = useUserActions()
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });
    const handleSubmit = (values: { email: string }) => {
        console.log('Form Values:', values);
        forgetPassword(values.email);
    };
    return (
        <div className='bg-custom-gradient ' >
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-10 items-center min-h-screen gap-20 lg:gap-28">
                <div className="px-5 md:px-0 mx-auto mt-5 w-full">
                    <div className="space-y-1 mb-8">
                        <h1 className="text-2xl lg:text-3xl mb-3">
                            Forgot Your Password
                        </h1>
                        <p className="text-xs text-gray-500">
                            Please provide the email address linked to your account for password reset instructions.
                        </p>
                    </div>
                    <Formik
                        initialValues={{ email: '' }}
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
                                <Button type='submit' children={!isLoading && "Send Password Reset Link"} fullWidth={true} radius='sm' size='sm' className="shadow-md bg-black text-white" isLoading={isLoading} />
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
