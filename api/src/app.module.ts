import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ArticlesModule } from './articles/articles.module';
import {WritterMiddleware} from "./middleware/writer.middleware";
import * as session from 'express-session';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/pielegniarka'),
            UserModule,
            ArticlesModule,
          ],
  controllers: [AppController],
  providers: [AppService, WritterMiddleware],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(WritterMiddleware)
            .forRoutes({ path: 'api/articles', method: RequestMethod.POST });

    }
}