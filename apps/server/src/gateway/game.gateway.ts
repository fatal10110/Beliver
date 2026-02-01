import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const SOCKET_CORS_ORIGINS = (process.env.SOCKET_CORS_ORIGIN ?? 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export type JoinGamePayload = {
  gameId: string;
  userId?: string;
};

export type SubmitTurnPayload = {
  gameId: string;
  turn: number;
  actions?: unknown[];
};

@WebSocketGateway({
  cors: {
    origin: SOCKET_CORS_ORIGINS,
    credentials: true,
  },
})
export class GameGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('join_game')
  handleJoinGame(
    @MessageBody() payload: JoinGamePayload,
    @ConnectedSocket() client: Socket,
  ) {
    if (!payload?.gameId) {
      return { status: 'error', message: 'gameId is required' };
    }

    client.join(payload.gameId);
    client.emit('joined_game', { gameId: payload.gameId, userId: payload.userId ?? null });
    return { status: 'ok', gameId: payload.gameId };
  }

  @SubscribeMessage('submit_turn')
  handleSubmitTurn(@MessageBody() payload: SubmitTurnPayload) {
    if (!payload?.gameId) {
      return { status: 'error', message: 'gameId is required' };
    }

    return {
      status: 'queued',
      gameId: payload.gameId,
      turn: payload.turn,
      receivedAt: new Date().toISOString(),
    };
  }
}
