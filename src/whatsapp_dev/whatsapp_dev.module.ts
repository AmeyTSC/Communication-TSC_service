import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatsappLogsave } from './whatsapp_logs.service';
import { WhatsappDevController } from './whatsapp_dev.controller';
import { whatsapp_logs,WhatsapplogSchema } from '../Schema/whatsapp_logs.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: whatsapp_logs.name, schema: WhatsapplogSchema },
    ]),
  ],
  providers: [WhatsappLogsave],
  controllers: [WhatsappDevController]
})
export class WhatsappDevModule {}
