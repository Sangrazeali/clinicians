import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { RotateLeft } from '../../../images';

export interface SignaturePadRef {
    saveSignature: () => void;
    clearSignature: () => void;
}

const SignaturePad = forwardRef<SignaturePadRef>((_, ref) => {
    const sigCanvas = useRef<SignatureCanvas>(null);

    // Expose methods to the parent
    useImperativeHandle(ref, () => ({
        saveSignature: () => {
            const dataURL = sigCanvas.current?.toDataURL("image/png");
            return dataURL;
        },
        clearSignature: () => sigCanvas.current?.clear(),
    }));

    return (
        <div className="flex flex-col border border-gray-200 rounded-md w-96 mt-5">
            <div className="border-b">
                <button type='button'
                    onClick={() => sigCanvas.current?.clear()}
                    className="px-4 flex items-center gap-2 py-2 w-12 text-xs text-app-primary rounded hover:underline"
                >
                    <p>Reset</p> <img src={RotateLeft} alt="" />
                </button>
            </div>
            <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                    className: 'w-96 h-28',
                }}
            />
        </div>
    );
});

export default SignaturePad;
