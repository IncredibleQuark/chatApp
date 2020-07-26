export interface ISocketService {
	bootstrap(io: SocketIO.Server): void;
}
