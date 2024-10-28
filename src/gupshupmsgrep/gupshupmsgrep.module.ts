import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GupshupmsgrepController } from './gupshupmsgrep.controller';
import { GupshupmsgrepService } from './gupshupmsgrep.service';
import { GupshupUpdateStatus } from 'src/Services/gupshupupdates.service';
import {
  WhatsAppHitLog,
  WhatsAppHitLogSchema,
} from 'src/Schema/whatsapp_hits.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WhatsAppHitLog.name, schema: WhatsAppHitLogSchema },
    ]),
  ],
  controllers: [GupshupmsgrepController],
  providers: [GupshupmsgrepService,GupshupUpdateStatus],
})
export class GupshupmsgrepModule {}
