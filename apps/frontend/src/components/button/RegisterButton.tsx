import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { modalStyle } from "../styles";
import RegisterForm from "../form/RegisterForm";

export default function RegisterButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleModalOpen}>
        Register
      </Button>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <RegisterForm />
        </Box>
      </Modal>
    </>
  );
}
