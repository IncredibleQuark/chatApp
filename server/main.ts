import express, {Application} from "express";
import socket from "socket.io";
import * as http from "http";
import {Server} from "http";
import {SocketService} from "./services/socketService/SocketService";

const socketPort: number = 3000;
const app: Application = express();
const server: Server = http.createServer(app);
const io: SocketIO.Server = socket(server);

const socketService: SocketService = new SocketService(io);
socketService.bootstrap();

server.listen(socketPort, () => {
	console.warn(`Server started, listen sockets on: ${socketPort}`);
});
