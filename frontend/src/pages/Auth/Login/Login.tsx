import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthComponent from "../../../components/AuthComponent/AuthComponent";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onLoginSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-indigo-100">
      <div className="container flex justify-center items-center w-full h-full">
        <AuthComponent />
        <div className="flex items-center w-5/12 h-3/5 bg-white rounded-r-3xl">
          <div className="flex flex-col justify-center items-center w-10/12 mx-auto">
            <h2 className="mb-6 text-3xl font-semibold self-start">Login</h2>
            <form
              onSubmit={handleSubmit(onLoginSubmit)}
              className="flex flex-col w-full"
            >
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full pl-5 py-3 my-3 text-sm bg-slate-100 rounded"
              />
              <ErrorMessage error={errors.email} />
              <PasswordInput register={register} error={errors.password} />
              <button
                type="submit"
                className="bg-indigo-200 text-white w-full h-11 my-2 rounded-3xl font-bold text-base hover:bg-indigo-800"
              >
                LOGIN
              </button>
            </form>
            <p className="my-4">Or</p>
            <button
              type="submit"
              className="bg-indigo-100 text-indigo-900 w-full h-11 my-2 rounded-3xl font-bold text-base hover:bg-indigo-300"
              onClick={() => navigate("/register")}
            >
              CREATE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
