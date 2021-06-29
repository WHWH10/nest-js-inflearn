import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { MorganInterceptor } from 'nest-morgan';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  // @UseInterceptors(MorganInterceptor('tiny'))
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
