import { Button, Container, Typography } from "@mui/material";
import { FormTextField } from "../FormTextField";

export default function RegistryForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      password: data.get("password"),
    });
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
        <FormTextField
          name="password"
          id="password"
          label="Password"
          type="password"
        />
        <FormTextField
          id="confirm-password"
          label="Confirm Password"
          type="password"
        />
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
