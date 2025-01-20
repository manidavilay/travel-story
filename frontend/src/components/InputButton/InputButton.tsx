import classnames from "classnames";

interface Props {
  type: "submit" | "button";
  label: string;
  level: "primary" | "secondary";
}

const InputButton = ({ type, label, level }: Props) => {
  return (
    <button
      type={type}
      className={classnames(
        level === "primary"
          ? "bg-indigo-200 text-white"
          : level === "secondary" && "bg-indigo-100 text-indigo-900",
        "w-full h-11 my-2 rounded-3xl font-bold text-base"
      )}
    >
      {label}
    </button>
  );
};

export default InputButton;
