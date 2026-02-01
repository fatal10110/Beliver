import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { CacheService } from './cache.service';
import { REDIS_CLIENT } from './redis.constants';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const url = configService.get<string>('REDIS_URL');
        const host = configService.get<string>('REDIS_HOST') ?? '127.0.0.1';
        const port = Number(configService.get<string>('REDIS_PORT') ?? 6379);
        const client = url
          ? createClient({ url })
          : createClient({
              socket: {
                host,
                port,
              },
            });
        client.on('error', (error) => {
          // eslint-disable-next-line no-console
          console.error('Redis Client Error', error);
        });
        await client.connect();
        return client;
      },
    },
    CacheService,
  ],
  exports: [REDIS_CLIENT, CacheService],
})
export class RedisModule {}
