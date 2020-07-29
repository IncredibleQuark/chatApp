import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RoomComponent } from './components/room/room.component';
import { AuthGuard } from './guards/auth/auth.guard';
import {LeaveRoomGuard} from './guards/leaveRoom/leave-room.guard';

const routes: Routes = [
  {
    path: '',
    component: RoomComponent,
    canActivate: [AuthGuard],
    canDeactivate: [LeaveRoomGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
