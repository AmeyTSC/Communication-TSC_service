import { Module } from '@nestjs/common';
import { WhatsappstatusController } from './whatsappstatus.controller';
import { WhatsappstatusService } from './whatsappstatus.service';
import { MongooseModule } from '@nestjs/mongoose';
import { whatsapp_logs,WhatsapplogSchema } from '../Schema/whatsapp_logs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: whatsapp_logs.name, schema: WhatsapplogSchema },
    ]),
  ],
  controllers: [WhatsappstatusController],
  providers: [WhatsappstatusService]
})
export class WhatsappstatusModule {}
