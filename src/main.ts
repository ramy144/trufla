import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { Swagger } from './shared/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.setGlobalPrefix('v1');
 
  //enableCors(app)
 
  app.useGlobalPipes(new ValidationPipe());

  Swagger.setup(app)

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  await app.listen(process.env.PORT, () => {
    console.log('\x1b[32m%s\x1b[0m','[Nest] Listening on port ', process.env.PORT);
  });
}
bootstrap();
