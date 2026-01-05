import { io } from "socket.io-client";

const socket = io("https://lbackend-2.onrender.com/", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
