import React, { useState } from 'react';

export interface InputProps {
    label: string;
    name: string;
    id?: string;
    type?: string;
    value: string | number;
    placeholder?: string;
    errorMessage?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    showPasswordToggle?: boolean;
    eyeIcon?: string;
    eyeCloseIcon?: string;
    disabled?: boolean
}

function Input({
    label,
    name,
    id,
    type = 'text',
    placeholder,
    value,
    errorMessage,
    onChange,
    onBlur,
    showPasswordToggle = false,
    eyeIcon,
    eyeCloseIcon,
    disabled
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4 text-xs">
            <label className="block text-gray-700 text-sm mb-2" htmlFor={id}>
                {label} <span className='text-red-500'>*</span>
            </label>
            <div className={`relative ${showPasswordToggle ? 'flex items-center' : ''}`}>
                <input
                    name={name}
                    id={id || name}
                    type={showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    onBlur={onBlur}
                    className={`block w-full border ${errorMessage ? 'border-red-500' : 'border-gray-200'
                        } text-gray-700 py-2.5 px-3 rounded leading-tight focus:outline-none focus:bg-white ${errorMessage ? 'focus:border-red-500' : 'focus:border-gray-500'
                        }`}
                />
                {showPasswordToggle && type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-sm text-gray-500"
                    >
                        <img
                            src={showPassword ? eyeIcon : eyeCloseIcon}
                            alt="toggle visibility"
                            className="w-4"
                        />
                    </button>
                )}
            </div>
            {errorMessage && (
                <p className="text-xs pt-2 text-red-500 text-left">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}

export default Input;
