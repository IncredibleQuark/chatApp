import {Injectable} from '@angular/core';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SocketService} from '../../services/socketService/socket.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveRoomGuard implements CanDeactivate<unknown> {

  constructor(private readonly socketService: SocketService) {
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const loggedUser: string = localStorage.getItem('username');

    if (loggedUser) {
      localStorage.removeItem('username');
      this.socketService.disconnect();
    }
    return true;
  }

}
