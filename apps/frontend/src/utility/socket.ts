import { Socket, io } from "socket.io-client";
import { GlobalRef } from "./GlobalRef";

const URL = process.env.backendBaseURL ?? "";

const socketRef = new GlobalRef<Socket>("socketRef");
if (!socketRef.value) {
  socketRef.value = io(URL);
}
export const socket = socketRef.value;
