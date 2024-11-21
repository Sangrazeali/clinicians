import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/global-components/Button';
import { CountryFlag, EmailIcon, jbLogo, PhoneIcon, PrimaryPlus, UploaDoc, UserAvatar } from '../../../images/index';
import Input from '../../../components/global-components/Input';
import Select from '../../../components/global-components/Select';
import SignaturePad, { SignaturePadRef } from './SignaturePad';
import jsPDF from "jspdf";
const AgreementForm = () => {
    const pdfRef = React.useRef({} as any);
    const signaturePadRef = React.useRef<SignaturePadRef>(null);
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
        console.log("values", values);
        const signatureDataURL = signaturePadRef.current?.saveSignature();
        console.log("Form submitted with signature:", signatureDataURL);



        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const pdfWidth = 210;
        const sectionHeight = 20;

        // Logo dimensions
        const logoWidth = 60;
        const logoHeight = 10;
        const logoX = (pdfWidth - logoWidth) / 2;
        const logoY = 5;

        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, pdfWidth, sectionHeight, "F");
        doc.addImage(jbLogo, "PNG", logoX, logoY, logoWidth, logoHeight);

        doc.setFontSize(14);
        if (values.profilePhoto) {
            const profile = values?.profilePhoto && URL.createObjectURL(values?.profilePhoto);
            profile && doc.addImage(profile, "PNG", 20, 35, 30, 30);
        }


        //   
        doc.setFontSize(18);
        doc.text(values.fullName, 60, 45);
        doc.setFontSize(12);
        doc.addImage(CountryFlag, "PNG", 60, 50, 4, 4);
        doc.text(values.country, 66, 54);
        doc.addImage(PhoneIcon, "PNG", 60, 58, 4, 4);
        doc.text(values.phone.toString(), 66, 62);
        doc.addImage(EmailIcon, "PNG", 60, 66, 4, 4);
        doc.text(values.email, 66, 70);
        doc.setFontSize(18);
        doc.text("Contact Form", 75, 90);
        doc.setFontSize(12);
        doc.text("orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            20, 100,
            { maxWidth: 170 }
        )
        doc.setFontSize(18);
        doc.text(values.fullName, 20, 150);

        signatureDataURL && doc.addImage(signatureDataURL, "PNG", 20, 150, 110, 20);
        doc.addPage();
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, pdfWidth, sectionHeight, "F");
        doc.setFontSize(18);
        doc.text("Front - Document", 75, 35);
        doc.addImage(jbLogo, "PNG", logoX, logoY, logoWidth, logoHeight);
        if (values.frontDocument) {
            const front = values?.frontDocument && URL.createObjectURL(values?.frontDocument);
            front && doc.addImage(front, "PDF", 20, 50, 160, 60);
        }
        doc.text("Back - Document", 75, 130);
        if (values.backDocument) {
            const back = values?.backDocument && URL.createObjectURL(values?.backDocument);
            back && doc.addImage(back, "PDF", 20, 140, 160, 60);
        }
        const pdfBlob = doc.output("blob");
        doc.save("agreement.pdf");
    };

    useEffect(() => {
    }, []);



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
                                            <div>
                                                <img src={URL.createObjectURL(values.profilePhoto)} alt="Profile" />
                                                <div className='flex justify-center items-center gap-2 mt-2'>
                                                    <p className="text-black text-sm align-middle text-center">Replace Photo</p>
                                                    <img src={PrimaryPlus} className='w-4 h-4' alt="" />
                                                </div>
                                            </div>
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
                                    <div className="bg-white">
                                        <label className="relative w-full h-25 p-10 text-center cursor-pointer text-xs rounded-lg border-dotted border-2 border-gray-200 flex justify-center items-center">
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
                                        {values.frontDocument && (
                                            <div className='w-full mt-5'>
                                                <img src={URL.createObjectURL(values.frontDocument)} className='w-full' alt="frontdocument" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-white">
                                        <label className="relative w-50 h-25 p-10 text-center cursor-pointer text-xs rounded-lg border-dotted border-2 border-gray-200 flex justify-center items-center">
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
                                        {values.backDocument && (
                                            <div className='w-full mt-5'>
                                                <img src={URL.createObjectURL(values.backDocument)} className='w-full' alt="backdocument" />
                                            </div>
                                        )}
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
                            <SignaturePad ref={signaturePadRef} />
                        </div>

                        <div className="flex items-center space-x-2 rounded p-2  accent-app-primary">
                            <label className='text-sm flex items-center gap-2    '>
                                <Field
                                    type="checkbox"
                                    name="confirm"
                                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-app-primary shadow-sm focus:border-app-primary focus:ring-none focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                                />
                                I agree to the terms and conditions
                            </label></div>
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
