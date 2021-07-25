import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as signalr from '@microsoft/signalr';
import { NameDialogComponent } from '../shared/components/name-dialog/name-dialog.component';
import { MethodsName } from '../shared/models/constants/methodsName';
import { Message } from '../shared/models/message';
import { environment } from './../../environments/environment';
import { validatorNoWhitespace } from './../shared/utils/utils';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  messages: Message[] = [];
  userName!: string;
  connection: signalr.HubConnection;
  textControl!: FormControl;

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {
    this.connection = new signalr.HubConnectionBuilder()
      .withUrl(environment.urlServer).build();

    this.formValidator();
    this.openModal();
  }

  formValidator(): void {
    this.textControl = new FormControl('', [Validators.required, validatorNoWhitespace]);
  }

  openModal(): void {
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '350px',
      data: this.userName,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.userName = result.toUpperCase();
      this.startConnection();
    })
  }

  openSnackBar(userName: string): void {
    const message = userName === this.userName ? 'Você entrou na sala' : `${userName} acabou de entrar`;
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  startConnection(): void {
    this.connection.on(MethodsName.newMessage, (userName: string, text: string) => {
      this.messages = [...this.messages, { userName, text }];
    });

    this.connection.on(MethodsName.newUser, (userName: string) => {
      this.openSnackBar(userName);
    });

    this.connection.on(MethodsName.previousMessages, (messages: Message[]) => {
      this.messages = messages;
    });

    this.connection.start()
      .then(() => {
        this.connection.send(MethodsName.newUser, this.userName, this.connection.connectionId);
        this.openSnackBar(this.userName);
      });
  }

  sendMessage(): void {
    this.connection.send(MethodsName.newMessage, this.userName, this.textControl.value)
      .then(() => {
        this.textControl.setValue('');
      });
  }
}
