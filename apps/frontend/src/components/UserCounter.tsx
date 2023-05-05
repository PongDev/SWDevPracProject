import { socket } from "@/utility/socket";
import { Container, Typography } from "@mui/material";
import { useState } from "react";

export default function UserCounter() {
  const [user, setUser] = useState(0);
  socket?.on("counter", (data: number) => setUser(data));

  return (
    <Container>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        User Counter: {user > 0 ? user : ""}
      </Typography>
    </Container>
  );
}
