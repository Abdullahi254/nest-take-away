import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

const SECRET_TOKEN = process.env.WEBHOOK_SECRET || 'my_secret_token';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || authHeader !== `Bearer ${SECRET_TOKEN}`) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
