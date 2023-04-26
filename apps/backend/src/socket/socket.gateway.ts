import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { backendConfig } from 'config';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('Socket');
  private connectionCounter: number;

  afterInit() {
    this.logger.log('Socket initialized');
    this.connectionCounter = 0;
    setInterval(() => {
      this.server.emit('counter', this.connectionCounter);
    }),
      backendConfig.broadcastDelay;
  }

  handleConnection() {
    this.connectionCounter++;
    this.logger.log('Client connected: ' + this.connectionCounter);
    this.server.emit('counter', this.connectionCounter);
  }

  handleDisconnect() {
    this.connectionCounter--;
    this.logger.log('Client disconnected: ' + this.connectionCounter);
    this.server.emit('counter', this.connectionCounter);
  }
}
