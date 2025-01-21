import { FieldError } from "react-hook-form";

interface Props {
  error: FieldError | undefined;
}

export default function ErrorMessage({ error }: Props) {
  return error && <p className="mb-3 text-red-500 text-sm">{error.message}</p>;
}
