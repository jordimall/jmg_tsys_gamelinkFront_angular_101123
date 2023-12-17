import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  private message: string = '';

  setMessage(message: string) {
    this.message = message;
  }

  getMessage() {
    let temp = this.message;
    this.clearMessage();
    return temp;
  }

  clearMessage() {
    this.message = '';
  }
}
