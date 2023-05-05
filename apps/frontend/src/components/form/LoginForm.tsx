import { Button, Container, Typography } from "@mui/material";
import { FormTextField } from "../FormTextField";
import { useState } from "react";
import { apiClient } from "@/utility/api";

type Props = {
  setModalOpen: (bool: boolean) => void;
};

export default function RegistryForm({ setModalOpen }: Props) {
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    try {
      const res = await apiClient?.login({
        email: data.get("email")?.toString() ?? "",
        password: data.get("password")?.toString() ?? "",
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
          Login
        </Button>
      </Container>
    </>
  );
}
