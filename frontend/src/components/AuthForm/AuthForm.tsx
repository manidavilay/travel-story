import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosError } from "axios";
import axiosInstance from "../../utils/axiosIntance";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";

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

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const BASE_URL = import.meta.env.VITE_API_URL;

  const switchAuthType = () => {
    setAuthType((prev) => {
      const newAuthType = prev === "login" ? "register" : "login";
      accountRequired.current = newAuthType === "register";
      clearErrors();
      return newAuthType;
    });
  };

  const onAuthFormSubmit = async () => {
    const { fullName, email, password } = getValues();

    try {
      const endpoint = authType === "login" ? "/auth/login" : "/auth/register";
      const response = await axiosInstance.post(`${BASE_URL}${endpoint}`, {
        fullName,
        email,
        password,
      });

      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        clearErrors();
        console.log("Authentication successful!");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "An unknown server error occurred.";
        setError("root", { type: "server", message: errorMessage });
      } else {
        setError("root", {
          type: "server",
          message: "An unexpected error occurred. Please try again.",
        });
      }
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
          <InputField
            type="text"
            placeholder="Full Name"
            register={register}
            field="fullName"
            error={errors.fullName}
          />
        )}
        <InputField
          type="email"
          placeholder="Email"
          register={register}
          field="email"
          error={errors.email}
        />
        <InputField
          type="password"
          placeholder="Password"
          register={register}
          field="password"
          error={errors.password}
        />
        {errors.root && (
          <p className="mb-3 text-red-500 text-sm">{errors.root?.message}</p>
        )}
        <Button type="submit" variant="primary" label="VALIDATE" />
      </form>
      <Button
        type="button"
        variant="secondary"
        label={authType === "login" ? "CREATE ACCOUNT" : "LOGIN"}
        handleFunction={switchAuthType}
      />
    </>
  );
};

export default AuthForm;
