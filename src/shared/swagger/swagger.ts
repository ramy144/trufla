import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  static setup(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('trufla-test')
      .setVersion('1.0')
      .setDescription('March 2021')
      .setContact('Ramiii','https://www.linkedin.com/in/ramy-ahmed-shawky-5400b3ba/','ramy.ahmed.143@gmail.com')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
  }
}
