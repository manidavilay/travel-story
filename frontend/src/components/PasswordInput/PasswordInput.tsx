import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface Props {
  register: UseFormRegister<{ password: string; email: string }>;
  error: FieldError | undefined;
}

const PasswordInput = ({ register, error }: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <>
      <div className="flex items-center bg-slate-100 px-5 rounded mb-3">
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
      <ErrorMessage error={error} />
    </>
  );
};

export default PasswordInput;
