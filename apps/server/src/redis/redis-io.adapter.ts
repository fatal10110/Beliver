import { IoAdapter } from '@nestjs/platform-socket.io';
import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  private pubClient = createClient();
  private subClient = createClient();

  constructor(app: INestApplication, private readonly configService: ConfigService) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const url = this.configService.get<string>('REDIS_URL');
    const host = this.configService.get<string>('REDIS_HOST') ?? '127.0.0.1';
    const port = Number(this.configService.get<string>('REDIS_PORT') ?? 6379);

    this.pubClient = url
      ? createClient({ url })
      : createClient({
          socket: {
            host,
            port,
          },
        });
    this.subClient = this.pubClient.duplicate();

    await Promise.all([this.pubClient.connect(), this.subClient.connect()]);
  }

  createIOServer(port: number, options?: Parameters<IoAdapter['createIOServer']>[1]) {
    const server = super.createIOServer(port, options);
    server.adapter(createAdapter(this.pubClient, this.subClient));
    return server;
  }
}
