import { Button } from "@mui/material";

type Props = {
  setIsLogin: (bool: boolean) => void;
};

export default function LogoutButton({ setIsLogin }: Props) {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogin(false);
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
