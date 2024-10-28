// whatsappstatus.controller.ts
import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { WhatsappstatusService } from './whatsappstatus.service';

@Controller('whatsapp')
export class WhatsappstatusController {
  constructor(private readonly whatsappstatusService: WhatsappstatusService) {}

  @Get('checkstatus')
  async whatsapp_status_check(@Query('phoneNo') phoneNo: string) {
    try {
      const result = await this.whatsappstatusService.getWhatsappLogByPhone(phoneNo);
      return {
        statusCode: HttpStatus.OK,
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
