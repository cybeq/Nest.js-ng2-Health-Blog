import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ArticlesModule } from './articles/articles.module';
import {WritterMiddleware} from "./middleware/writer.middleware";
import * as express from 'express';
import * as session from 'express-session';

import {FilesController} from "./files/files.controller";
import {SessionController} from "./middleware/session.controller";

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/pielegniarka'),
            UserModule,
            ArticlesModule,

          ],
  controllers: [AppController, FilesController, SessionController],
  providers: [AppService, WritterMiddleware],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(WritterMiddleware)
            .forRoutes({path: 'api/articles', method: RequestMethod.POST});
    }

}