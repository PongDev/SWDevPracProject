import { Button } from "@mui/material";

export default function LogoutButton() {
  const handleLogout = () => {};

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
