declare module 'react-signature-canvas' {
    import * as React from 'react';
  
    export interface SignatureCanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
      penColor?: string;
      backgroundColor?: string;
      canvasProps?: React.HTMLAttributes<HTMLCanvasElement>;
      clear?: () => void;
      toDataURL?: (type?: string, encoderOptions?: number) => string;
    }
  
    export default class SignatureCanvas extends React.Component<SignatureCanvasProps> {
      clear: () => void;
      toDataURL: (type?: string, encoderOptions?: number) => string;
    }
  }
  