import { Button, Container, Typography } from "@mui/material";
import { FormTextField } from "../FormTextField";
import { apiClient } from "@/utility/api";
import { useState } from "react";

type Props = {
  setModalOpen: (bool: boolean) => void;
};

export default function RegistryForm({ setModalOpen }: Props) {
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await apiClient?.register({
        email: data.get("email")?.toString() ?? "",
        name: data.get("firstname") + " " + data.get("lastname"),
        password: data.get("password")?.toString() ?? "",
        tel: data.get("tel")?.toString() ?? "",
      });
    } catch (err: any) {
      setErrorMsg(err.response.data.message);
      return;
    }
    setErrorMsg("");
    setModalOpen(false);
  };

  return (
    <>
      <Container component="form" onSubmit={handleSubmit}>
        <Typography
          variant="h6"
          component="h6"
          align="center"
          fontWeight={"bold"}
          color="black"
          padding={"1rem"}
        >
          Register Form
        </Typography>
        <FormTextField name="email" id="email" label="Email" />
        <FormTextField name="firstname" id="firstname" label="First Name" />
        <FormTextField name="lastname" id="lastname" label="Last Name" />
        <FormTextField name="tel" id="tel" label="Telephone" />
        <FormTextField
          name="password"
          id="password"
          label="Password"
          type="password"
        />
        <Typography
          color={"warning.main"}
          variant="body1"
          fontWeight={"bold"}
          align="center"
        >
          {errorMsg}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          Register
        </Button>
      </Container>
    </>
  );
}
