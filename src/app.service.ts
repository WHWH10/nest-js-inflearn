import { Injectable } from '@nestjs/common';
import logger from './config/logger.config';
import { onStart } from './config/logs';

@Injectable()
export class AppService {
  getHello(): string {
    logger.info('Success');
    return process.env.PORT;
  }
}
