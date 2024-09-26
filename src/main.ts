import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { RateLimitInterceptor } from './common/interceptors/rate-limit.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new RateLimitInterceptor());
  setupSwagger(app); 
  await app.listen(3000);
}
bootstrap();
