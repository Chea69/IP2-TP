import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const type = context.getType<string>();

    if (type === 'http') {
      const req = context.switchToHttp().getRequest();
      const method = req?.method ?? 'UNKNOWN';
      const url = req?.url ?? 'UNKNOWN';

      return next.handle().pipe(
        tap(() => {
          const ms = Date.now() - start;
          console.log(`[HTTP] ${method} ${url} - ${ms}ms`);
        }),
      );
    }

    if (type === 'graphql') {
      return next.handle().pipe(
        tap(() => {
          const ms = Date.now() - start;
          console.log(`[GraphQL] request - ${ms}ms`);
        }),
      );
    }

    return next.handle();
  }
}
