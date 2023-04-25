import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { modalStyle } from "../styles";
import LoginForm from "../form/LoginForm";

export default function LoginButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleModalOpen}>
        Login
      </Button>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <LoginForm />
        </Box>
      </Modal>
    </>
  );
}
