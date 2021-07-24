import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
import { environment } from './../../environments/environment';

type Message = {
  userName: string,
  text: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  messages: Message[] = [
    {
      text: 'Olá',
      userName: 'Lucian'
    },
    {
      text: 'Eae',
      userName: 'Joana'
    },
    {
      text: 'Salvee',
      userName: 'Thiago'
    }
  ];
  messageControl = new FormControl('');
  userName = 'Lucian';
  connection: signalr.HubConnection;

  constructor() {
    this.connection = new signalr.HubConnectionBuilder()
      .withUrl(environment.urlServer).build();

    this.startConnection();
  }

  ngOnInit(): void {
  }

  startConnection(): void {
    this.connection.on('newMessage', (userName: string, text: string) => {
      this.messages = [...this.messages, { userName, text }];
    });

    this.connection.start().then(() => console.log('server conected!'));
  }

  sendMessage(): void {
    this.connection.send('newMessage', this.userName, this.messageControl.value)
      .then(() => {
        this.messageControl.setValue('');
      })
  }
}
