import classnames from "classnames";

interface Props {
  type: "submit" | "button";
  variant: "primary" | "secondary";
  label: string;
  handleFunction?: () => void;
}

const Button = ({ type, handleFunction, variant, label }: Props) => {
  return (
    <button
      type={type}
      onClick={handleFunction}
      className={classnames(
        "w-full h-11 my-2 rounded-3xl font-bold text-base transition-colors duration-200",
        {
          "bg-indigo-200 text-white hover:bg-indigo-800": variant === "primary",
          "bg-indigo-100 text-indigo-900 hover:bg-indigo-300":
            variant === "secondary",
        }
      )}
    >
      {label}
    </button>
  );
};

export default Button;
