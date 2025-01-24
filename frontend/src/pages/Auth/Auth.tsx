import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosError } from "axios";
import axiosInstance from "../../utils/axiosIntance";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import styles from "./Auth.module.scss";

const Auth = () => {
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const navigate = useNavigate();

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
      const response = await axiosInstance.post(`${endpoint}`, {
        fullName,
        email,
        password,
      });

      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        clearErrors();
        navigate("/dashboard");
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
    <div className="relative flex justify-center items-center h-screen bg-indigo-100">
      <div className="container flex justify-center items-center w-full h-full">
        <div
          className={classnames(
            "relative container flex items-end w-5/12 h-5/6 bg-white rounded-3xl",
            styles.mainImage
          )}
        >
          <div
            className={classnames(
              "absolute w-full h-full rounded-3xl",
              styles.layover
            )}
          />
          <div className="relative z-10 w-10/12 ml-6 mb-10 text-white">
            <h1 className="mb-3 text-4xl font-semibold">
              Capture, share, and relive your adventures
            </h1>
            <p className="text-lg">
              This is the place to document all of your travels
            </p>
          </div>
        </div>
        <div className="flex items-center w-5/12 h-3/5 bg-white rounded-r-3xl">
          <div className="flex flex-col justify-center items-center w-10/12 mx-auto">
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
                <p className="mb-3 text-red-500 text-sm">
                  {errors.root?.message}
                </p>
              )}
              <Button type="submit" variant="primary" label="VALIDATE" />
            </form>
            <Button
              type="button"
              variant="secondary"
              label={authType === "login" ? "CREATE ACCOUNT" : "LOGIN"}
              handleFunction={switchAuthType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
