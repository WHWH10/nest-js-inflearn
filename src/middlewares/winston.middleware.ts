import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { format, createLogger, transports } from 'winston';

@Injectable()
export class WinstonMiddleWare implements NestMiddleware {
  private logger: winston.Logger;

  use(request: Request, response: Response, next: NextFunction): void {
    const { combine, timestamp, prettyPrint, printf, label, colorize } = format;
    const myFormat = printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    });

    const dailyInfoLog = new winston.transports.DailyRotateFile({
      filename: 'logs/info/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '14d',
    });

    const dailyErrorLog = new winston.transports.DailyRotateFile({
      filename: 'logs/error/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '14d',
    });

    const logger = createLogger({
      level: 'info',
      format: combine(
        format.json(),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        prettyPrint(),
      ),
      transports: [dailyInfoLog, dailyErrorLog],
      // transports: [new transports.File(options.file)],
    });

    if (process.env.NODE_ENV !== 'production') {
      // logger.add(new transports.Console(options.console))
      logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.align(),
            myFormat,
          ),
        }),
      );
    }

    next();
  }
}
