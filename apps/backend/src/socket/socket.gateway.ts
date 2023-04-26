import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { backendConfig } from 'config';
import { Server, Socket } from 'socket.io';

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

  handleConnection(@ConnectedSocket() client: Socket) {
    this.connectionCounter++;
    this.logger.log(
      `Client connected from ${client.handshake.address}: ${this.connectionCounter}`,
    );
    this.server.emit('counter', this.connectionCounter);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.connectionCounter--;
    this.logger.log(
      `Client disconnected from ${client.handshake.address}: ${this.connectionCounter}`,
    );
    this.server.emit('counter', this.connectionCounter);
  }
}
