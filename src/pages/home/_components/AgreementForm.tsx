import React, { useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/global-components/Button';
import { EmailIcon, jbLogo, PrimaryPlus, UploaDoc, UserAvatar, UserPlaceholder } from '../../../images/index';
import Input from '../../../components/global-components/Input';
import Select from '../../../components/global-components/Select';
import SignaturePad, { SignaturePadRef } from './SignaturePad';
import jsPDF from 'jspdf';
import { useAppContext } from '../../../context-api';
import { useUserActions } from '../../../context-api/actions';
import { Spinner } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { convertFileToBase64 } from '../../../utils/convertFileToBase64';
import { url } from 'inspector';

const AgreementForm = () => {
    const { state } = useAppContext();
    const { postMigration, loadingStates } = useUserActions();
    const [formError, setFormError] = useState<string | null>(null);
    const user = state?.dashboard_data;
    const signaturePadRef = useRef<SignaturePadRef>(null);

    const initialValues = {
        documentType: '',
        profilePicture: null as File | null,
        frontDocument: null as File | null,
        backDocument: null as File | null,
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
            if (values?.profilePicture) {
                const profilePictureBase64 = await convertFileToBase64(values.profilePicture);
                doc.addImage(profilePictureBase64 || user?.profilePicture || UserPlaceholder, "PNG", 20, 35, 30, 30);
            }
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
            doc.setFontSize(18);
            doc.text(user?.userName || "Unknown User", 20, 260);
            if (signatureDataURL) {
                doc.addImage(signatureDataURL, "PNG", 10, 270, 110, 20);
            }
            doc.addPage();
            doc.setFillColor(0, 0, 0);
            doc.rect(0, 0, pdfWidth, sectionHeight, "F");
            doc.addImage(jbLogo, "PNG", logoX, logoY, logoWidth, logoHeight);
            doc.setFontSize(18);
            if (values.documentType) {
                doc.text("Document - Front", 75, 50);

                if (values.frontDocument) {
                    const frontDocumentBase64 = await convertFileToBase64(values.frontDocument);
                    doc.addImage(frontDocumentBase64, "PNG", 20, 60, 150, 50);
                }

                doc.text("Document - Back", 75, 150);

                if (values.backDocument) {
                    const backDocumentBase64 = await convertFileToBase64(values.backDocument);
                    doc.addImage(backDocumentBase64, "PNG", 20, 160, 150, 50);
                }
            }
            const formData = new FormData();
            formData.append("kycType", values?.documentType?.toLowerCase() || "");

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

            if (values.profilePicture) formData.append('profilePhoto', values?.profilePicture);
            if (values.frontDocument) formData.append('kycFront', values?.frontDocument);
            if (values.backDocument) formData.append('kycBack', values?.backDocument);

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
            <div className="w-full">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                        <Form>
                            {formError && (
                                <div className="w-full bg-red-100 text-red-500 text-center py-2 rounded-md text-xs mb-5">
                                    {formError}
                                </div>
                            )}

                            {/* User Details Section */}
                            <div className="grid grid-cols-[1fr_5fr] gap-5 border-b pb-5">
                                <div className="mx-auto">
                                    <div className="bg-white">
                                        <label htmlFor="upload" className="relative flex flex-col text-xs items-center gap-2 cursor-pointer">
                                            {values.profilePicture ? (
                                                <div className="relative">
                                                    <img
                                                        src={URL.createObjectURL(values.profilePicture)}
                                                        className="w-28 h-28 rounded-full object-cover"
                                                        alt="Profile"
                                                    />
                                                    <div className="absolute -top-1 right-1">
                                                        <img src={PrimaryPlus} alt="Add Icon" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="relative border-3 rounded-full p-5 border-gray-200">
                                                    <img src={UserAvatar} alt="Default Avatar" />
                                                    <div className="absolute -top-1 right-0">
                                                        <img src={PrimaryPlus} alt="Add Icon" />
                                                    </div>
                                                </div>
                                            )}
                                            {!values.profilePicture && <span className="text-black text-xs">Add Profile Photo</span>}
                                            <input
                                                id="upload"
                                                accept="image/png"
                                                type="file"
                                                onChange={(e) => setFieldValue('profilePicture', e.target.files?.[0] || null)}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <Input label="Full Name" name="fullName" value={user?.userName} disabled />
                                    <Input label="Email" name="email" value={user?.email} disabled />
                                    <Select
                                        label="Select Document"
                                        name="documentType"
                                        options={['Select Document', 'Passport', 'Id']}
                                        value={values.documentType}
                                        onChange={(e) => {
                                            setFieldValue('documentType', e.target.value);
                                            setFieldValue('frontDocument', null);
                                            setFieldValue('backDocument', null);
                                        }}
                                        errorMessage={touched.documentType && errors.documentType ? errors.documentType : undefined}
                                    />

                                    {values.documentType && values.documentType !== 'Select Document' && (
                                        <div className="bg-white grid grid-cols-2 gap-4 mb-5">
                                            {/* Front Document */}
                                            <div>
                                                <label className="relative w-full h-40 text-center cursor-pointer text-xs rounded-lg border-dotted border-2 border-gray-200 flex justify-center items-center">
                                                    {!values.frontDocument ? (
                                                        <div className="absolute flex flex-col items-center gap-2">
                                                            <img src={UploaDoc} className="w-8" alt="Upload Icon" />
                                                            <span>Upload Front Image Max 20MB (PNG only)</span>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={URL.createObjectURL(values.frontDocument)}
                                                            className="absolute w-[120px] h-[120px] object-contain rounded-lg"
                                                            alt="Front Document Preview"
                                                        />
                                                    )}
                                                    <input
                                                        type="file"
                                                        className="opacity-0 w-full h-full"
                                                        accept="image/png"
                                                        onChange={(e) => setFieldValue('frontDocument', e.target.files?.[0] || null)}
                                                    />
                                                </label>
                                            </div>

                                            {/* Back Document */}
                                            <div>
                                                <label className="relative w-full p-3 h-40 text-center cursor-pointer text-xs rounded-lg border-dotted border-2 border-gray-200 flex justify-center items-center">
                                                    {!values.backDocument ? (
                                                        <div className="absolute flex flex-col items-center gap-2">
                                                            <img src={UploaDoc} className="w-8" alt="Upload Icon" />
                                                            <span>Upload Back Image Max 20MB (PNG only)</span>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={URL.createObjectURL(values.backDocument)}
                                                            className="absolute w-[120px] h-[120px] object-contain rounded-lg"
                                                            alt="Back Document Preview"
                                                        />
                                                    )}
                                                    <input
                                                        type="file"
                                                        className="opacity-0 w-full h-full"
                                                        accept="image/png"
                                                        onChange={(e) => setFieldValue('backDocument', e.target.files?.[0] || null)}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>

                            {/* Agreement Section */}
                            <div className="py-5">
                                <div className="border-b">
                                    <div className="h-[190px] overflow-auto scrollbar-hide">
                                        <p className="text-gray-500 text-xs text-justify">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eos.
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold mt-5">Signature</p>
                                <p className="text-xs text-gray-500">Please draw your signature below:</p>
                                <SignaturePad ref={signaturePadRef} />
                            </div>

                            <div className="flex items-center space-x-2 p-2 accent-app-primary">
                                <label className="text-xs flex items-center gap-2">
                                    <Field
                                        type="checkbox"
                                        name="confirm"
                                        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-app-primary shadow-sm focus:border-app-primary focus:ring-none focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                                    />
                                    I confirm that the information provided is accurate and valid
                                </label>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    isDisabled={isSubmitting || !values.confirm}
                                    className="my-5 w-[150px] bg-app-primary text-white"
                                >
                                    {isSubmitting ? <Spinner color="white" /> : 'Submit'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AgreementForm;
