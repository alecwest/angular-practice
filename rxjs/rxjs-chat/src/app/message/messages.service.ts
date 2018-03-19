import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message } from './message.model';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';

@Injectable()
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>;

  constructor() { }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages
      .filter((message: Message) => {
        return (message.thread.id === thread.id) &&
               (message.author.id !== user.id);
      });
  }
}
