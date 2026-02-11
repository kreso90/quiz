import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface InputSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: string[];
  id?: string;
  onInputChange?: (value: string) => void;
  onOptionSelect?: (value: string) => void;
}

export const InputSelect = ({
  id,
  options,
  onInputChange,
  onOptionSelect,
  ...props
}: InputSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="relative">
      <div className="relative w-full">
        <input
          type="text"
          className="pr-10!"
          id={id}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onInputChange?.(e.target.value);
          }}
          {...props}
        />
        <div
          className="flex items-center bg-gray-200 px-1 rounded-r absolute right-0 bottom-0 top-0 m-auto cursor-pointer z-10  hover:bg-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown className={`${isOpen ? "rotate-180" : ""} transition`} />
        </div>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"} absolute rounded p-2 border border-gray-300 max-h-32 overflow-auto bg-white w-full left-0 top-full z-20`}
        onClick={() => setIsOpen(false)}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className="bg-white cursor-pointer hover:bg-gray-100 p-2"
            onClick={() => {
              setInputValue(option);
              setIsOpen(false);
              onInputChange?.(option);
              onOptionSelect?.(option);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};
