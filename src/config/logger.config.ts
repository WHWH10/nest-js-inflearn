import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { S3StreamLogger } from 's3-streamlogger';
import { format, createLogger, transports } from 'winston';
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

const s3Stream = new S3StreamLogger({
  bucket: 'hyd-sample',
  folder: '/logs',
  config: {
    endpoint: process.env.NAVER_CLOUD_END_POINT,
    credentials: {
      accessKeyId: process.env.NAVER_CLOUD_ACCESS_KEY_ID,
      secretAccessKey: process.env.NAVER_CLOUD_SECRET_KEY,
    },
  },
});

const transport = new winston.transports.Stream({
  stream: s3Stream,
});

const options = {
  file: {
    level: 'info',
    filename: `logs/test.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
    format: combine(label({ label: 'HTTP' }), timestamp(), myFormat),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(label({ label: 'HTTP' }), timestamp(), myFormat),
  },
};

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

export default logger;
