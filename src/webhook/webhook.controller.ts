import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Req, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookMessageDto } from './dto/webhook-message.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RateLimiterService } from '../common/rate-limiter/rate-limiter.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly rateLimiterService: RateLimiterService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async handleWebhook(@Req() req, @Body() dto: WebhookMessageDto) {
    const phone = dto.phone;

    // Rate limiting: Allow 5 requests per minute per phone number
    if (!this.rateLimiterService.allowRequest(phone)) {
        throw new HttpException('Forbidden', HttpStatus.TOO_MANY_REQUESTS);
    }

    return this.webhookService.processMessage(dto);
  }
}
