import { Controller, Post } from '@nestjs/common';
import { ResendwhatsappService } from './resendwhatsapp.service';

@Controller('resendwhatsapp')
export class ResendwhatsappController {
  constructor(
    private readonly whatsappLogProcessorService: ResendwhatsappService,
  ) {}

  @Post()
  async processLogs() {
    try {
      await this.whatsappLogProcessorService.processWhatsappLogs();
      return {
        status: 200,
        message: 'Logs processed successfully',
      };
    } catch (error) {
      return {
        status: 400,
        message: 'Error processing logs',
        error: error.message,
      };
    }
  }
}
