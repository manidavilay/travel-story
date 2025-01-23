import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import * as yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface Props {
  register: UseFormRegister<{
    fullName?: yup.Maybe<string | undefined>;
    email: string;
    password: string;
  }>;
}

const PasswordInput = ({ register }: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <div className="flex items-center w-full bg-slate-100 px-5 rounded mb-3">
      <input
        type={isPasswordShown ? "text" : "password"}
        placeholder="Password"
        {...register("password")}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />
      {isPasswordShown ? (
        <FaRegEye
          className="text-indigo-800 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      ) : (
        <FaRegEyeSlash
          className="text-indigo-800 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
  );
};

export default PasswordInput;
