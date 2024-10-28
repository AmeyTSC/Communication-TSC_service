import { Controller, Body, Post } from '@nestjs/common';
import { EmailSqsService } from './email-sqs.service';

@Controller('emailsqs')
export class EmailSqsController {
  constructor(private readonly emailSQS: EmailSqsService) {}
  @Post()
  async emailSqs(@Body() body: any) {
    return await this.emailSQS.sendMessageToSqs(body);
  }
}
