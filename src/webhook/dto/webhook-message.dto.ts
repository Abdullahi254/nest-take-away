import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class WebhookMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsPhoneNumber("KE")
  phone: string;
}
