import classnames from "classnames";
import styles from "./AuthComponent.module.scss";

const AuthComponent = () => {
  return (
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
  );
};

export default AuthComponent;
