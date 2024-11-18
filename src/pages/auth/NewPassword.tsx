import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthBanner from '../../components/Banner/AuthBanner';
import Input from '../../components/global-components/Input';
import { EyeCloseIcon, EyeIcon } from '../../images';

function NewPassword() {
    const [passwordStrength, setPasswordStrength] = useState(0);

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const handlePasswordChange = (value: string) => {
        const strength = calculatePasswordStrength(value);
        setPasswordStrength(strength);
    };

    const calculatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 6) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[@$!%*?&#]/.test(password)) strength += 1;
        return strength;
    };

    const handleSubmit = (values: { password: string; confirmPassword: string }) => {
        console.log('Form Values:', values);
    };

    return (
        <div className="bg-custom-gradient">
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-10 items-center min-h-screen gap-20 lg:gap-28">
                <div className="px-5 md:px-0 mx-auto mt-5 w-full">
                    <div className="space-y-1 mb-8">
                        <h1 className="text-2xl lg:text-3xl mb-3">Reset Your Password</h1>
                        <p className="text-xs text-gray-500">
                            Type and confirm a secure new password for the account
                        </p>
                    </div>
                    <Formik
                        initialValues={{ password: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, handleChange, handleBlur, values }) => (
                            <Form className="space-y-5">
                                <Input
                                    label="New Password"
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={values.password}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handlePasswordChange(e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                    errorMessage={
                                        errors.password && touched.password ? errors.password : ''
                                    }
                                    showPasswordToggle={true}
                                    eyeIcon={EyeIcon}
                                    eyeCloseIcon={EyeCloseIcon}
                                />
                                <div className="flex mt-2 space-x-1">
                                    {[1, 2, 3, 4].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-1 flex-1 ${
                                                passwordStrength >= level
                                                    ? passwordStrength === 1
                                                        ? 'bg-red-500'
                                                        : passwordStrength === 2
                                                        ? 'bg-orange-500'
                                                        : passwordStrength === 3
                                                        ? 'bg-orange-500'
                                                        : 'bg-green-500'
                                                    : 'bg-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <Input
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errorMessage={
                                        errors.confirmPassword && touched.confirmPassword
                                            ? errors.confirmPassword
                                            : ''
                                    }
                                    showPasswordToggle={true}
                                    eyeIcon={EyeIcon}
                                    eyeCloseIcon={EyeCloseIcon}
                                />

                                <button
                                    type="submit"
                                    className="bg-black mb-3 hover:shadow-md text-white text-xs font-semibold py-2 px-4 rounded focus:outline-none w-full"
                                >
                                    Send Password Reset Link
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <AuthBanner />
            </div>
        </div>
    );
}

export default NewPassword;
