import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetWhatsappLog } from './getwhatsapplog.service';
import { GetwhatsappstatusController } from './getwhatsappstatus.controller';
import {
  whatsapp_logs,
  WhatsapplogSchema,
} from 'src/Schema/whatsapp_logs.schema';
import {
  WhatsAppHitLog,
  WhatsAppHitLogSchema,
} from 'src/Schema/whatsapp_hits.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: whatsapp_logs.name, schema: WhatsapplogSchema },
    ]),
    MongooseModule.forFeature([
      { name: WhatsAppHitLog.name, schema: WhatsAppHitLogSchema },
    ]),
  ],
  controllers: [GetwhatsappstatusController],
  providers: [GetWhatsappLog],
})
export class GetwhatsappstatusModule {}
