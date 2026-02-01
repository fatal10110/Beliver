import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './redis/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  const redisAdapter = new RedisIoAdapter(app, configService);
  try {
    await redisAdapter.connectToRedis();
    app.useWebSocketAdapter(redisAdapter);
  } catch (error) {
    logger.warn('Redis adapter not configured; WebSocket scaling disabled.');
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
