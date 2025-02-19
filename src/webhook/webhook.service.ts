import { Injectable} from '@nestjs/common';
import { firestore } from '../config/firebase.config';
import { WebhookMessageDto } from './dto/webhook-message.dto';

@Injectable()
export class WebhookService {
  private messagesCollection = firestore.collection('messages');

  async processMessage(dto: WebhookMessageDto) {
    const { message, phone } = dto;

    // Storing message in document
    const newMessageRef = this.messagesCollection.doc();
    const newMessage = { id: newMessageRef.id, message, phone, timestamp: new Date() };
    await newMessageRef.set(newMessage);

    // If message has help reply"
    if (message.toLowerCase().includes('help')) {
      const reply = { reply: 'Support contact: support@company.com' };
      return reply;
    }

    return { status: 'Message received' };
  }

}
