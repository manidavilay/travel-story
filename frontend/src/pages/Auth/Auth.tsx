import classnames from "classnames";
import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "./Auth.module.scss";

const Auth = () => {
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
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
