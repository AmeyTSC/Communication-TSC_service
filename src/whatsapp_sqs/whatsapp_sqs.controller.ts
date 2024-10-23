import { Controller, Post,Body } from '@nestjs/common';
import { WhatsappSqsService } from './whatsapp_sqs.service';

@Controller('whatsapp-sqs')
export class WhatsappSqsController {
    constructor(private readonly whatsappSqs:WhatsappSqsService){}
    @Post('send')
    async sendMessage(@Body() body: any) {
        const templateAttributes  = body.template_attributes;
        return this.whatsappSqs.sendMessageToSqs(templateAttributes);
    }
}
