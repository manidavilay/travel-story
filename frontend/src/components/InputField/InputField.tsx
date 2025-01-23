import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import * as yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface Props {
  type: string;
  register: UseFormRegister<{
    fullName?: yup.Maybe<string | undefined>;
    password: string;
    email: string;
  }>;
  field: "fullName" | "email" | "password";
  placeholder: string;
  error: FieldError | undefined;
}

const InputField = ({ type, register, field, placeholder, error }: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <>
      <div className="flex items-center w-full bg-slate-100 px-5 rounded mb-3">
        <input
          type={isPasswordShown ? "text" : type}
          placeholder={placeholder}
          {...register(field)}
          className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-indigo-800 hover:text-indigo-500 transition-colors cursor-pointer ml-2"
          >
            {isPasswordShown ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        )}
      </div>
      {error && <p className="mb-3 text-red-500 text-sm">{error.message}</p>}
    </>
  );
};

export default InputField;
