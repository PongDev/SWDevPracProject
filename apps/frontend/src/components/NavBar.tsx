import {
  AppBar,
  Button,
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

type Props = {
  isLogin: boolean;
};

export function NavBar({ isLogin }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileMenu = isLogin ? (
    <LogoutButton />
  ) : (
    <>
      <RegisterButton />
      <span style={{ padding: "0.5rem" }} />
      <LoginButton />
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Jobs Registration
        </Typography>
        {profileMenu}
      </Toolbar>
    </AppBar>
  );
}
