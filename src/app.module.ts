import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { WinstonMiddleWare } from './middlewares/winston.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    // MorganModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //   {
    //   provide: APP_INTERCEPTOR,
    //   useClass: MorganInterceptor('combined'),
    // }
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer.apply(WinstonMiddleWare).forRoutes('*');
  }
}
