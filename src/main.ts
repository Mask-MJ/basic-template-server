import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { FormatResponse } from 'src/common/interceptor/response.interceptor';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 日志
    logger: WinstonModule.createLogger({
      // options (same as WinstonModule.forRoot() options)
    }),
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new FormatResponse());
  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  const { httpAdapter } = app.get(HttpAdapterHost);
  // prisma 异常过滤器
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // 获取环境变量
  const { APP_NAME, PORT } = process.env;
  const config = new DocumentBuilder()
    .setTitle(`${APP_NAME} 接口文档`)
    .setDescription(`The ${APP_NAME} API escription`)
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'bearer',
      description: '基于 JWT token',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(Number(PORT) || 3000);
}
bootstrap();
