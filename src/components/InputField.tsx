import React from "react";

interface InputFieldProps {
  label?:string;
  type: string;
  name: string;
  value?:string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({ type, name ,label, value,onChange}: InputFieldProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input
      value={value}
        type={type}
        name={name}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  );
}

export default InputField;
