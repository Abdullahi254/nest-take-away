import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { AuthGuard } from '../common/guards/auth.guard';
import { RateLimiterService } from '../common/rate-limiter/rate-limiter.service';

@Module({
  providers: [WebhookService, AuthGuard, RateLimiterService],
  controllers: [WebhookController]
})
export class WebhookModule {}
