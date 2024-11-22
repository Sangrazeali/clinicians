import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/global-components/Button';
import { EmailIcon, jbLogo, UploaDoc, UserPlaceholder } from '../../../images/index';
import Input from '../../../components/global-components/Input';
import Select from '../../../components/global-components/Select';
import SignaturePad, { SignaturePadRef } from './SignaturePad';
import jsPDF from "jspdf";
import { useAppContext } from '../../../context-api';
import { useUserActions } from '../../../context-api/actions';
import { Spinner } from '@nextui-org/react';
import { toast } from "react-toastify";
const AgreementForm = () => {
    const { state } = useAppContext();
    const { postMigration, loadingStates } = useUserActions();
    const [formError, setFormError] = useState<string | null>(null);
    const user = state?.dashboard_data;
    const signaturePadRef = React.useRef<SignaturePadRef>(null);
    const migrateState = state?.post_migration;

    const initialValues = {
        documentType: '',
        documents: [],
        confirm: false,
    };

    const validationSchema = Yup.object({
        documentType: Yup.string().required('Document type is required'),
        confirm: Yup.boolean().oneOf([true], 'You must confirm to proceed'),
    });

    const handleSubmit = async (
        values: typeof initialValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            const signatureDataURL = signaturePadRef.current?.saveSignature();

            const doc = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const pdfWidth = 210;
            const sectionHeight = 20;
            const logoWidth = 60;
            const logoHeight = 10;
            const logoX = (pdfWidth - logoWidth) / 2;
            const logoY = 5;

            doc.setFillColor(0, 0, 0);
            doc.rect(0, 0, pdfWidth, sectionHeight, "F");
            doc.addImage(jbLogo, "PNG", logoX, logoY, logoWidth, logoHeight);

            doc.setFontSize(14);
            doc.addImage(user?.profilePicture || UserPlaceholder, "PNG", 20, 35, 30, 30);
            doc.setFontSize(18);
            doc.text(user?.userName || "Unknown User", 60, 45);
            doc.setFontSize(12);
            doc.addImage(EmailIcon, "PNG", 60, 50, 4, 4);
            doc.text(user?.email || "No Email", 66, 53);
            doc.setFontSize(18);
            doc.text("Contact Form", 75, 90);
            doc.setFontSize(12);
            doc.text(
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
                20,
                100,
                { maxWidth: 170 }
            );

            if (signatureDataURL) {
                doc.addImage(signatureDataURL, "PNG", 10, 150, 110, 20);
            }

            const formData = new FormData();
            formData.append("kycType", values?.documentType || "");

            if (signatureDataURL && typeof signatureDataURL === 'string' && (signatureDataURL as string).startsWith('data:image/png;base64,')) {
                const byteString = atob((signatureDataURL as string).split(',')[1]);
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < byteString.length; i++) {
                    uint8Array[i] = byteString.charCodeAt(i);
                }

                const blob = new Blob([arrayBuffer], { type: 'image/png' });
                formData.append("sig", blob, "signature.png");
            }

            formData.append("contract", doc.output("blob"));

            values?.documents?.forEach((file, index) => {
                if (file) {
                    formData.append(`kyc`, file);
                }
            });

            formData.append("checkagreement", String(values?.confirm.toString()));

            console.log("tyepeppep", typeof values?.confirm.toString())
            await postMigration(formData);
            toast.success("Form submitted successfully");

        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitting(false);
            toast.error("An error occurred while submitting the form.");
        }
    }

    return (
        <div className="w-full">
            <Formik
                initialValues={{ documents: [], documentType: '', fullName: '', email: '', confirm: false }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue, handleChange, handleBlur, isSubmitting }) => (
                    <Form>
                        {formError && (
                            <div className="w-full bg-red-100 text-red-500 text-center py-2 rounded-md text-xs mb-5">
                                {formError}
                            </div>
                        )}

                        <div className="grid grid-cols-[1fr_5fr] gap-5 border-b pb-5">
                            <div className="mx-auto">
                                <div className="bg-white">
                                    <label htmlFor="profilePhoto" className="flex flex-col text-xs items-center gap-2 cursor-pointer">
                                        <div className='w-full'>
                                            <img src={user?.profilePicture ? user?.profilePicture : UserPlaceholder} className='rounded-xl' alt="Profile" />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <Input
                                    label="Full Name"
                                    name="fullName"
                                    placeholder='Enter your full name'
                                    value={user?.userName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled
                                />
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder='Enter your email address'
                                    value={user?.email}
                                    onChange={handleChange}
                                    disabled
                                    onBlur={handleBlur}
                                />
                                <Select
                                    label="Select Document"
                                    name="documentType"
                                    options={['Select Document', 'passport', 'id']}
                                    value={values.documentType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errorMessage={touched.documentType && errors.documentType ? errors.documentType : undefined}
                                />
                                <div className="mb-5">
                                    <div className="bg-white">
                                        <label className="relative w-full h-25 p-10 text-center cursor-pointer text-xs rounded-lg border-dotted border-2 border-gray-200 flex justify-center items-center">
                                            <div className="absolute flex flex-col items-center gap-2">
                                                <img src={UploaDoc} className="w-8" alt="" />
                                                <span className="block text-black font-normal">
                                                    Upload Documents (PNG only)
                                                </span>
                                            </div>
                                            <input
                                                type="file"
                                                className="h-full w-full opacity-0"
                                                multiple
                                                accept="image/png"
                                                onChange={(e) => {
                                                    const files = e.target.files ? Array.from(e.target.files) : [];
                                                    const invalidFiles = files.filter(file => file.type !== 'image/png');
                                                    if (invalidFiles.length > 0) {
                                                        setFormError('Only PNG files are allowed!');
                                                        return;
                                                    }
                                                    setFormError(null);
                                                    setFieldValue('documents', files);
                                                }}
                                            />
                                        </label>

                                        {values.documents && values.documents.length > 0 && (
                                            <div className="w-full mt-5 grid grid-cols-2 gap-4">
                                                {values.documents.map((file: File, index: number) => (
                                                    <div key={index} className="w-full">
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            className="w-full h-[150px] rounded-xl object-cover"
                                                            alt={`document-${index}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
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
                            <label className='text-sm flex items-center gap-2'>
                                <Field
                                    type="checkbox"
                                    name="confirm"
                                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-app-primary shadow-sm focus:border-app-primary focus:ring-none focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                                />
                                I agree to the terms and conditions
                            </label>
                        </div>

                        <div className='flex justify-end'>
                           
                            <Button type="submit" fullWidth  isDisabled={isSubmitting || user?.applicationStatus !== 'pending' || !values?.confirm} className="my-5 w-[150px] bg-app-primary text-white">
                                {isSubmitting ? <Spinner color='white' /> : 'Submit'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AgreementForm;
