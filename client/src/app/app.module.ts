import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RoomComponent } from './components/room/room.component';
import { AppMaterialModule } from './app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {SocketService} from './services/socketService/socket.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
