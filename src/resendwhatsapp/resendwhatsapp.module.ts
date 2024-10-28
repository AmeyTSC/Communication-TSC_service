import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResendwhatsappController } from './resendwhatsapp.controller';
import { ResendwhatsappService } from './resendwhatsapp.service';
import { whatsapp_logs,WhatsapplogSchema } from '../Schema/whatsapp_logs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: whatsapp_logs.name, schema: WhatsapplogSchema },
    ]),
  ],
  controllers: [ResendwhatsappController],
  providers: [ResendwhatsappService]
})
export class ResendwhatsappModule {}
