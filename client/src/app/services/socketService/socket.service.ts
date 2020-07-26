import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ISocketMessage} from '../../models/ISocketMessage';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io(environment.socketUrl);
  }

  public login(username): void {
    this.socket.emit('login', username);
  }

  public getMessages(): Observable<ISocketMessage> {
    return Observable.create((observer) => {
      this.socket.on('new message', (message) => {
        observer.next(message);
      });
    });
  }

  public updateUserList(): Observable<string[]> {
    return Observable.create((observer) => {
      this.socket.on('update user list', (message) => {
        observer.next(message);
      });
    });
  }

  public sendMessage(message: string): void {
    this.socket.emit('new message', message);
  }

}
