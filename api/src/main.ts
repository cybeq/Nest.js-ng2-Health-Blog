import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  * as session from 'express-session';
import * as path from "path";
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }));
  const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
  app.use('/api/files/storage', express.static(UPLOADS_DIR));
  await app.listen(3000);
}
bootstrap();
