import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import RegisterButton from "./button/RegisterButton";
import { useState } from "react";
import LoginButton from "./button/LoginButton";
import LogoutButton from "./button/LogoutButton";
import UserCounter from "./UserCounter";

type Props = {
  isLogin: boolean;
  setIsLogin: (bool: boolean) => void;
};

export function NavBar({ isLogin, setIsLogin }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileMenu = isLogin ? (
    <LogoutButton setIsLogin={setIsLogin} />
  ) : (
    <>
      <RegisterButton />
      <span style={{ padding: "0.5rem" }} />
      <LoginButton setIsLogin={setIsLogin} />
    </>
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton onClick={handleClick}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <Link href="/">Home</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/jobs">Jobs</Link>
          </MenuItem>
        </Menu>
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ lineBreak: "unset" }}>
            Jobs Registration
          </Typography>
          <Box>
            <UserCounter />
          </Box>
          <Box>{profileMenu}</Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
