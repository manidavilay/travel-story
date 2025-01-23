import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../../utils/axiosIntance";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import PasswordInput from "../PasswordInput/PasswordInput";

const AuthForm = () => {
  const [authType, setAuthType] = useState<"login" | "register">("login");

  const accountRequired = useRef(false);
  const schema = yup.object().shape({
    fullName: yup.lazy(() => {
      if (accountRequired.current) {
        return yup.string().required("Full Name is required");
      }
      return yup.string().notRequired();
    }),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const switchAuthType = () => {
    setAuthType((prev) => {
      const newAuthType = prev === "login" ? "register" : "login";
      accountRequired.current = newAuthType === "register";
      return newAuthType;
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const BASE_URL = import.meta.env.VITE_API_URL;

  const onAuthFormSubmit = async () => {
    const { fullName, email, password } = getValues();
    try {
      const response = await axiosInstance.post(
        authType === "login"
          ? `${BASE_URL}/auth/login`
          : `${BASE_URL}/auth/register`,
        {
          fullName: fullName,
          email: email,
          password: password,
        }
      );
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold self-start">
        {authType === "login" ? "Login" : "Create Account"}
      </h2>
      <form
        onSubmit={handleSubmit(onAuthFormSubmit)}
        className="flex flex-col w-full"
      >
        {authType === "register" && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName")}
              className="w-full pl-5 py-3 mb-3 text-sm bg-slate-100 rounded"
            />
            <ErrorMessage error={errors.fullName} />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full pl-5 py-3 mb-3 text-sm bg-slate-100 rounded"
        />
        <ErrorMessage error={errors.email} />
        <PasswordInput register={register} />
        <ErrorMessage error={errors.password} />
        <button
          type="submit"
          className="bg-indigo-200 text-white w-full h-11 my-2 rounded-3xl font-bold text-base hover:bg-indigo-800"
        >
          VALIDATE
        </button>
      </form>
      <button
        type="submit"
        className="bg-indigo-100 text-indigo-900 w-full h-11 my-2 rounded-3xl font-bold text-base hover:bg-indigo-300"
        onClick={switchAuthType}
      >
        {authType === "login" ? "CREATE ACCOUNT" : "LOGIN"}
      </button>
    </>
  );
};

export default AuthForm;
