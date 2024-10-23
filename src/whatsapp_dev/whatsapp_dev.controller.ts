import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { smsSent } from 'src/utils/sms_sent';
import { WhatsappLogsave } from './whatsapp_logs.service';
import { getTemplateDetail } from 'src/utils/whatsapp_template.attributes';

@Controller('whatsappsms')
export class WhatsappDevController {
  constructor(private readonly whatsappLogsave: WhatsappLogsave) {}

  @Post('send')
  async whatsapp_sms(@Body() body: { template_attributes: any }) {
    try {
      const templateInfo = await getTemplateDetail(body.template_attributes);
      const whatsappResponse = await smsSent(templateInfo);
      await this.whatsappLogsave.createLog(whatsappResponse, body.template_attributes);
      return {
        statusCode: 200,
        message: 'WhatsApp message sent successfully',
        data: whatsappResponse,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to send WhatsApp message: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
