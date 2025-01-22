import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const signupSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const onFormSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col w-full"
    >
      <input
        type="text"
        placeholder="Full Name"
        {...register("fullName")}
        className="w-full pl-5 py-3 mb-3 text-sm bg-slate-100 rounded"
      />
      <ErrorMessage error={errors.fullName} />
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="w-full pl-5 py-3 mb-3 text-sm bg-slate-100 rounded"
      />
      <ErrorMessage error={errors.email} />
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
      <ErrorMessage error={errors.password} />
      <button
        type="submit"
        className="bg-indigo-200 text-white w-full h-11 my-2 rounded-3xl font-bold text-base hover:bg-indigo-800"
      >
        VALIDATE
      </button>
    </form>
  );
};

export default SignUp;
