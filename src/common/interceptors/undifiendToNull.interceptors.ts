import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // data에 undefined 있으면 Null 변경
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
    // return next.handle().pipe(map((data) => ({ data, code: 'SUCCESS' })));
  }
}
