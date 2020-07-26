import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../../services/socketService/socket.service';
import {ISocketMessage} from '../../models/ISocketMessage';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild('messagesBox', {read: ElementRef}) messagesBox: ElementRef;
  public messages: ISocketMessage[] = [];
  public newMessage: string;
  public users: string[];
  private messagesSubscription: Subscription;
  private usersSubscription: Subscription;

  constructor(private readonly socketService: SocketService) {
  }

  public ngOnInit(): void {
    this.socketService.login(localStorage.getItem('username'));

    this.messagesSubscription = this.socketService.getMessages().subscribe((message) => {
        this.messages.push(message);

        this.scrollToBottom(); // it should be moved to watch on element changes because it's fired to quickly
      }, err => console.warn(err)
    );

    this.usersSubscription = this.socketService.updateUserList().subscribe((users) => {
      this.users = users;
    });

  }

  public ngAfterViewInit(): void {
    // subscribing to any changes in the list of messages
    // this.messagesListBox.changes.subscribe(() => {
    //   this.scrollToBottom();
    // });
  }

  public ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }

    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  public getLoggedUsername(): string {
    return '@' + localStorage.getItem('username');
  }

  public selectUser(username: string): void {
    if (this.newMessage) {
      this.newMessage += `@${username}`;
      return;
    }
    this.newMessage = `@${username}`;
  }

  public send(messageForm: NgForm): void {

    if (messageForm.value.message && messageForm.value.message.trim() !== '') {
      const message: string = messageForm.value.message;
      this.socketService.sendMessage(message);
      messageForm.reset();
    }

  }

  public scrollToBottom(): void {
    this.messagesBox.nativeElement.scrollTop = this.messagesBox.nativeElement.scrollHeight + 100;
  }

}
