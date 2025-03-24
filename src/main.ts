import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // const seedService = app.get(SeedService);
  // await seedService.seed();
  // await app.listen(process.env.PORT ?? 4000);
  const configService = app.get(ConfigService);
  // console.log('PORT ============> ', configService.get<number>('port'));
  await app.listen(configService.get<number>('port') ?? 4000);
}
bootstrap();
