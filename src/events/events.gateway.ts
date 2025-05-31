import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Client connected', socket.id);
      console.log('Socket connection status', socket.connected);
    });
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody()
    data: any,
  ) {
    console.log('Message received from the client ========> ', data);
    return data;
  }
}
