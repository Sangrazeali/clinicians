import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Button from '../../../components/global-components/Button';
import { RotateLeft } from '../../../images';

const SignaturePad: React.FC = () => {
    const sigCanvas = useRef<SignatureCanvas>(null);

    const clearSignature = () => {
        sigCanvas.current?.clear();
    };

    const saveSignature = () => {
        const dataURL = sigCanvas.current?.toDataURL("image/png");
        console.log("Signature Saved as Data URL: ", dataURL);
    };

    return (
        <div className="flex flex-col border border-gray-200 rounded-md w-96 mt-5">
         <div className='border-b'>
         <button
                onClick={clearSignature}
                className="px-4 flex items-center gap-2 py-2 w-12  text-xs text-app-primary rounded hover:uderline"
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
            <div className="mt-4 flex space-x-4">

                {/* <button
          onClick={saveSignature}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button> */}
            </div>
        </div>
    );
};

export default SignaturePad;
