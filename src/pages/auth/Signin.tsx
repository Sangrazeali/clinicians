import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeCloseIcon } from '../../images';
import constantPaths from '../../routes/constantPaths';
import AuthBanner from '../../components/Banner/AuthBanner';
import Input from '../../components/global-components/Input';
import { useUserActions } from '../../context-api/actions';
import Button from '../../components/global-components/Button';
import { getAccessTokenFromCookie } from '../../utils/cookies-actions/user.cookies';

const Signin = () => {
    const { SignIn, loadingStates } = useUserActions();
    const navigate = useNavigate();
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState(location.state?.message || null);
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = (values: { email: string; password: string }) => {
        console.log('Form Values:', values);
        SignIn(values)
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [successMessage]);
    useEffect(() => {
        const token = getAccessTokenFromCookie()
        if (token) {
            navigate(`${constantPaths.HOME}`);
        }
    })

    return (
        <div className='bg-custom-gradient '>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-10 items-center min-h-screen gap-20 lg:gap-28">
                <div className="px-5 md:px-0 mx-auto mt-5 w-full">
                    {successMessage && (
                        <div className='text-success-500 text-center bg-success-100 text-sm p-5 rounded-xl mb-10'>
                            <p>
                                {successMessage}
                            </p>
                        </div>
                    )}


                    <div className="space-y-1 mb-8">
                        <h1 className="text-2xl lg:text-3xl mb-3">Sign in to your Account</h1>
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, handleChange, handleBlur, values }) => (
                            <Form className="space-y-5">
                                <div className="mb-4 text-sm">
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
                                </div>

                                <div className="mb-4 text-sm">
                                    <Input
                                        label="Password"
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorMessage={errors.password && touched.password ? errors.password : ''}
                                        showPasswordToggle={true}
                                        eyeIcon={EyeIcon}
                                        eyeCloseIcon={EyeCloseIcon}
                                    />
                                </div>

                                {/* <div className="flex items-center space-x-2 rounded accent-app-primary pb-3">
                                    <Field
                                        type="checkbox"
                                        name="remember"
                                        id="remember"
                                        className="h-4 w-4 rounded border-gray-300 text-app-primary shadow-sm focus:border-app-primary focus:ring-none"
                                    />
                                    <label htmlFor='remember' className="flex w-full space-x-2 text-sm cursor-pointer text-gray-500">
                                        Remember Password
                                    </label>
                                </div> */}

                                <div>
                                    <Button type='submit' children={!loadingStates.signinLoading && "Sign In"} fullWidth={true} radius='sm' size='sm' className="shadow-md bg-black text-white" isLoading={loadingStates.signinLoading} />
                                    <p className="text-center mt-3">
                                        <Link to={constantPaths.FORGET_PASSWORD} className="text-xs text-gray-500 hover:underline">
                                            Forgot Password?
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <AuthBanner />
            </div>
        </div>

    );
};

export default Signin;
