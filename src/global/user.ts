import { Message } from './message';
import * as db from './database';

export class User {
  id: number;
  name: string;
  email: string;
  key: string | number;
  messages: Array<Message>;


  constructor(data: {id: any, name: string, email: string, key: string | number, messages?: Message[]}) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.key = data.key;
    this.messages = data.messages || [];
  }

  updateNewName(name: string): void {
    this.name = name;
    return;
  }

  updateNewEmail(email: string): void {
    this.email = email;
    return;
  }

  async sendMessage(content: string): Promise<any> {
    let message: Message = {
      content: content,
      date: new Date(Date.now())
    }

    this.messages.push(message);
    
    await db.updateUser(this);
    return;
  }
}