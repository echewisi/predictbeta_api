import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RateLimiterMemory } from 'rate-limiter-flexible';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  private rateLimiter = new RateLimiterMemory({
    points: 10, // Number of requests
    duration: 60, // Per minute
  });

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip;

    return this.rateLimiter
      .consume(ip)
      .then(() => next.handle())
      .catch(() => throwError(() => new Error('Too many requests')));
  }
}
