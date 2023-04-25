import { TextField } from "@mui/material";

type Props = {
  name?: string;
  id: string;
  label: string;
  type?: string;
  required?: boolean;
};

export function FormTextField({
  name,
  id,
  label,
  type = "text",
  required = true,
}: Props) {
  return (
    <TextField
      required={required}
      fullWidth
      name={name}
      id={id}
      label={label}
      type={type}
      autoFocus
      style={{ padding: "0.5rem" }}
    />
  );
}
