// Input.js
import React from 'react';

const Input = ({ type, label, value, onChange, required, placeholder }) => {
  return (
    <div>
      <label htmlFor={label} className="text-sm">
        {label}
      </label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="mt-1 p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Input;
