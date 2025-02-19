import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [UsersModule, WebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
