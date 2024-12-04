import React from 'react';

interface SelectProps {
  label: string;
  name: string;
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
}

const Select: React.FC<SelectProps> = ({ label, name, options, value, onChange, onBlur, errorMessage }) => {
  return (
    <div className="mb-4 text-sm w-full">
      <label className="block text-gray-700  mb-2" htmlFor={name}>
        {label} <span className='text-red-500'>*</span>
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block appearance-none w-full text-xs border text-gray-700 py-2.5 px-3 rounded leading-tight focus:outline-none 
            ${errorMessage ? 'border-red-500' : 'border-gray-200'} focus:bg-white`}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default Select;
