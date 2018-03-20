import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Thread } from './thread.model';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';

@Injectable()
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;
  orderedThreads: Subject<Thread[]> = new Subject<Thread[]>();
  currentThread: Subject<Thread> = new Subject<Thread>();
  currentThreadMessages: Subject<Message[]> = new Subject<Message[]>();

  constructor(public messagesService: MessagesService) {
    this.threads = messagesService.messages
      .map((messages: Message[]) => {
        const threads: {[key: string]: Thread} = {};
        messages.map(
          (message: Message) => {
            threads[message.thread.id] = threads[message.thread.id] || message.thread;
            const messagesThread: Thread = threads[message.thread.id];
            if (!messagesThread.lastMessage || messagesThread.lastMessage.sentAt < message.sentAt) {
              messagesThread.lastMessage = message;
            }
          });
          return threads;
      });

  }

}
