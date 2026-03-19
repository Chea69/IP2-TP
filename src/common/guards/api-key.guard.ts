import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { headers: any }>();
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== 'itc-123') {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}
