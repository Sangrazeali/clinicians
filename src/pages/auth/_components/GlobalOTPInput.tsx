import React from "react";
interface Props {
  cb?: (otp: string) => Promise<void>;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>, data: any) => void;
  isError?: boolean;
  error?: string;
  value?: string;
  setIsDisable?: React.Dispatch<React.SetStateAction<boolean>>;
  clearOTP?: boolean;
  setClearOTP?: React.Dispatch<React.SetStateAction<boolean>>;
}
const GlobalOTPInput = ({
  cb,
  name,
  onBlur,
  onChange,
  setIsDisable,
  clearOTP,
  setClearOTP,
}: Props) => {
  const inputRefs = React.useRef<HTMLInputElement[]>(Array(6).fill(null));
  const [vCode, setVCode] = React.useState(Array.from({ length: 6 }, () => ""));
  const [blurIndex, setBlurIndex] = React.useState<number[]>([]);
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (isNaN(Number(value))) return;
    const updatedOtp = [...vCode];
    updatedOtp[index] = value;
    setVCode(updatedOtp);
    if (cb) {
      if (updatedOtp.join("").length === 6) {
        setIsDisable && setIsDisable(false);
        cb(updatedOtp.join(""));
      } else {
        setIsDisable && setIsDisable(true);
      }
    }
    if (value && index < vCode.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleInputPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData("text");
    const otpArray = pastedData
      .slice(0, 6) // Limit to 6 characters
      .split("")
      .map((char) => (isNaN(Number(char)) ? "" : char));
    setVCode(otpArray);
    if (cb) {
      if (otpArray.join("").length === 6) {
        cb(otpArray.join(""));
        inputRefs.current[otpArray.length - 1]?.focus();
      }
    }
  };
  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const otpArray = text
        .slice(0, 6)
        .split("")
        .map((char) => (isNaN(Number(char)) ? "" : char));
      setVCode(otpArray);
      if (cb) {
        if (otpArray.join("").length === 6) {
          cb(otpArray.join(""));
          inputRefs.current[otpArray.length - 1]?.focus();
        }
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };
  const handleInputKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && index > 0) {
      event.preventDefault();
      const updatedOtp = [...vCode];
      updatedOtp[index] = "";
      setVCode(updatedOtp);
      const res = Array.from({ length: 6 }, (_, dt) => dt);
      setBlurIndex(res);
      inputRefs.current[index - 1]?.focus();
    }
  };
  React.useEffect(() => {
    if (clearOTP && setClearOTP) {
      setVCode(Array.from({ length: 6 }, () => ""));
      setBlurIndex([]);
      setClearOTP(false);
    }
  }, [clearOTP, setClearOTP]);
  React.useEffect(() => {
    // Auto-focus the first input field when the component mounts
    inputRefs.current[0]?.focus();
  }, []);
  return (
    <div className='flex items-center justify-center sm:gap-4 gap-2 w-full'>
      {Array.from({ length: 6 }, (_, index) => {
        return (
          <input
            key={index}
            name={name}
            type='text'
            maxLength={1}
            className={`no-arrows border border-gray-300 focus:border-app-primary/60 focus:shadow-lg focus:shadow-app-primary/20 sm:w-12 sm:h-16 w-10 h-14 text-xl text-center outline-none bg-transparent sm:py-2 sm:px-4 px-2 rounded-md ${
              blurIndex.includes(index) && vCode[index] === ""
                ? "border-app-danger"
                : "border-app-secondary"
            }`}
            ref={(el) => (inputRefs.current[index] = el!)}
            value={vCode[index]}
            onChange={(e) => {
              if (
                (vCode[index].length === 0 && e.target.value) ||
                (vCode[index].length === 1 && !e.target.value)
              ) {
                handleInputChange(index, e);
                onChange && onChange(e);
              }
            }}
            onPaste={handleInputPaste}
            onKeyDown={(e) => handleInputKeyDown(index, e)}
            placeholder='-'
            onBlur={(e) => {
              if (!e.target.value) {
                const res = Array.from({ length: 6 }, (_, dt) => dt);
                setBlurIndex(res);
                onBlur && onBlur(e, vCode);
              }
            }}
          />
        );
      })}
      {/* <button onClick={handlePasteFromClipboard} type='button'>
        "PasteIcon"
      </button> */}
    </div>
  );
};
export default GlobalOTPInput;