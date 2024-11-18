import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/global-components/Button';
import SignaturePad from './SignaturePad';
import { PrimaryPlus, UploaDoc, UserAvatar } from '../../../images/index';
import Input from '../../../components/global-components/Input';
import Select from '../../../components/global-components/Select';

const AgreementForm = () => {
    const initialValues = {
        fullName: '',
        email: '',
        documentType: 'Passport',
        country: '',
        phone: '',
        frontDocument: null,
        backDocument: null,
        profilePhoto: null,
        confirm: false,
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        documentType: Yup.string().required('Document type is required'),
        country: Yup.string().required('Country is required'),
        phone: Yup.string()
            .matches(/^\d+$/, 'Phone number must contain only digits')
            .required('Phone number is required'),
        confirm: Yup.boolean().oneOf([true], 'You must confirm to proceed'),
    });

    const handleSubmit = (values: typeof initialValues) => {
        console.log(values);
    };

    return (
        <div className="w-full">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, setFieldValue, handleChange, handleBlur }) => (
                    <Form>
                        <div className="grid grid-cols-[1fr_5fr] gap-5 border-b pb-5">
                            {/* Profile Photo Section */}
                            <div className="mx-auto">
                                <div className="bg-white">
                                    <label htmlFor="profilePhoto" className="flex flex-col text-xs items-center gap-2 cursor-pointer">
                                        {values.profilePhoto ? (
                                            <img src={URL.createObjectURL(values.profilePhoto)} alt="Profile" />
                                        ) : (
                                            <>
                                                <div className="relative border-3 rounded-full p-5 border-gray-200">
                                                    <img src={UserAvatar} alt="" />
                                                    <div className="absolute -top-1 right-0">
                                                        <img src={PrimaryPlus} alt="" />
                                                    </div>
                                                </div>
                                                <span className="text-black text-sm">Add Profile Photo</span>
                                            </>
                                        )}
                                    </label>
                                    <input
                                        id="profilePhoto"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => setFieldValue('profilePhoto', e.target.files ? e.target.files[0] : null)}
                                    />
                                </div>
                            </div>

                            {/* Form Fields Section */}
                            <div className="">
                                <Input
                                    label="Full Name"
                                    name="fullName"
                                    placeholder='Enter your full name'
                                    value={values.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errorMessage={touched.fullName && errors.fullName ? errors.fullName : undefined}
                                />
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder='Enter your email address'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errorMessage={touched.email && errors.email ? errors.email : undefined}
                                />
                                <Select
                                    label="Select Document"
                                    name="documentType"
                                    options={['Passport', 'Emirates ID']}
                                    value={values.documentType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errorMessage={touched.documentType && errors.documentType ? errors.documentType : undefined}
                                />
                                <div className="flex flex-wrap md:flex-nowrap gap-2 mb-5">
                                    {/* Front Document Upload */}
                                    <div className="bg-white">
                                        <label className="relative h-full p-10 text-center cursor-pointer text-xs rounded-lg border-dotted border-2 border-gray-200 flex justify-center items-center">
                                            <div className="absolute flex flex-col items-center gap-2">
                                                <img src={UploaDoc} className="w-8" alt="" />
                                                <span className="block text-black font-normal">Upload Frontside of Document</span>
                                            </div>
                                            <input
                                                type="file"
                                                className="h-full w-full opacity-0"
                                                onChange={(e) =>
                                                    setFieldValue('frontDocument', e.target.files ? e.target.files[0] : null)
                                                }
                                            />
                                        </label>
                                    </div>
                                    {/* Back Document Upload */}
                                    <div className="bg-white">
                                        <label className="relative h-full p-10 text-center cursor-pointer text-xs rounded-lg border-dotted border-2 border-gray-200 flex justify-center items-center">
                                            <div className="absolute flex flex-col items-center gap-2">
                                                <img src={UploaDoc} className="w-8" alt="" />
                                                <span className="block text-black font-normal">Upload Backside of Document</span>
                                            </div>
                                            <input
                                                type="file"
                                                className="h-full w-full opacity-0"
                                                onChange={(e) => setFieldValue('backDocument', e.target.files ? e.target.files[0] : null)}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2">
                                    <Select
                                        label="Country"
                                        name="country"
                                        options={['New Mexico', 'Missouri', 'Texas']}
                                        value={values.country}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorMessage={touched.country && errors.country ? errors.country : undefined}
                                    />
                                    <Input
                                        label="Phone Number"
                                        name="phone"
                                        type="number"
                                        placeholder='Enter your phone number'
                                        value={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorMessage={touched.phone && errors.phone ? errors.phone : undefined}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="py-5 border-b">
                            <div className="h-[190px] overflow-auto scrollbar-hide">
                                <p className="text-gray-500 text-xs text-justify">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eos.
                                </p>
                            </div>
                        </div>

                        <div className="py-5">
                            <p className="font-semibold">Signature</p>
                            <p className="text-xs text-gray-500">Please add your signature below:</p>
                            <SignaturePad />
                        </div>

                        <div className="flex items-center space-x-2 rounded p-2  accent-app-primary">
                            <input type="checkbox" id="checkagreement" name="checkagreement" className="h-4 w-4 cursor-pointer rounded border-gray-300 text-app-primary shadow-sm focus:border-app-primary focus:ring-none focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400" checked={values.confirm}
                                onChange={handleChange} />
                            <label htmlFor="checkagreement" className="flex w-full space-x-2 cursor-pointer text-xs text-gray-500"> I confirmed that i uploaded valid documents and my Signature </label>
                        </div>
                        <div className="flex items-center justify-end py-5 space-x-5">
                            <Button type="submit" className="w-[150px] shadow-md bg-[#F8971D] text-white" radius="sm" size="sm">
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AgreementForm;
