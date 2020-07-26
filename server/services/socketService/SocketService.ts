import {Socket} from "socket.io";
import {ISocketService} from "./ISocketService";
import {ISocketMessage} from "../../models/ISocketMessage";
import {IConnectedUser} from "../../models/IConnectedUser";
import {Logger} from "../../helpers/Logger";

export class SocketService implements ISocketService {

	private users: IConnectedUser[] = [];
	private SYSTEM_USERNAME = 'SYSTEM';

	constructor(private io: SocketIO.Server) {
	}

	public bootstrap(): void {
		this.io.on('connection', (socket: Socket) => {
			Logger.log(`User connected on socket ${socket.id}`);

			socket.on('login', (username: string) => this.handleLogin(socket, username));
			socket.on('new message', (message: string) => this.handleNewMessage(socket, message));
			socket.on('disconnect', () => this.handleDisconnect(socket));

		})
	}

	private getUser(socketId: string): IConnectedUser {
		const connectedUser: IConnectedUser | undefined = this.users.find((user) => {
			return user.sockets.indexOf(socketId) !== -1;
		});

		if (!connectedUser) {
			Logger.log(`User on socket: ${socketId} not found`);
			throw new Error(`User on socket: ${socketId} not found`);
		}
		return connectedUser;
	}

	private handleLogin(socket: Socket, username: string): void {
		Logger.log(`User ${username} logs in`);

		const connectedUser = this.users.find((user) => {
			return user.username === username;
		});

		if (!connectedUser) {
			Logger.log(`User ${username} logs in first tine`);
			this.users.push({username, sockets: [socket.id]});
			this.emitMessage({message: `User ${username} has joined.`, username: this.SYSTEM_USERNAME});
			this.emitUserList();
			return;
		}

		Logger.log(`User: ${username} already logged in`);
		connectedUser.sockets.push(socket.id);
		this.emitUserList();
	}

	private emitUserList(): void {
		Logger.log('Sending user list');
		this.io.emit('update user list', this.users.map( (user) => user.username));
	}

	private emitMessage(data: ISocketMessage): void {
		Logger.log('Sending new message');
		this.io.emit('new message', {
			message: data.message,
			username: data.username,
			date: data.date ? data.date : new Date(),
		})
	}

	private handleNewMessage(socket: Socket, message: string): void {
		const messageToClient: ISocketMessage = {
			message: message,
			username: this.getUser(socket.id).username,
		};
		this.emitMessage(messageToClient);
	}

	private handleDisconnect(socket: Socket): void {

		Logger.log(`User on socket: ${socket.id} is disconnecting`);

		const connectedUser = this.getUser(socket.id);
		const indexToDelete = connectedUser.sockets.indexOf(socket.id);
		connectedUser.sockets.splice(indexToDelete, 1);

		if (connectedUser.sockets.length === 0) {
			Logger.log(`User ${connectedUser.username} logged out`);
			this.emitMessage({message: `User ${connectedUser.username} has left.`, username: this.SYSTEM_USERNAME});
			this.users = this.users.filter( (user) => {
				return user.username !== connectedUser.username;
			});
		}
		this.emitUserList();

	}


}
