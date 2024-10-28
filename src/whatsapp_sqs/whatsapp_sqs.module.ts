import { Module } from '@nestjs/common';
import { WhatsappSqsController } from './whatsapp_sqs.controller';
import { WhatsappSqsService } from './whatsapp_sqs.service';
import { whatsapp_logs,WhatsapplogSchema } from '../Schema/whatsapp_logs.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatsappLogService } from '../Services/whatsapp-logcreate.service';
import { WhatsappTrigger } from 'src/Services/whatsapphit_error_logs.service';
import { WhatsappStatusService } from '../Services/whatsapp_status.service';
import { WhatsAppHitLog,WhatsAppHitLogSchema } from 'src/Schema/whatsapp_hits.schema';
import { WhatsAppErrorLog, WhatsAppErrorLogSchema } from 'src/Schema/whatsapp_error.schema';

@Module({
  imports:[MongooseModule.forFeature([
    { name: whatsapp_logs.name, schema: WhatsapplogSchema },
  ]),MongooseModule.forFeature([
    {name: WhatsAppHitLog.name,schema:WhatsAppHitLogSchema},
  ]),
  MongooseModule.forFeature([
    {name:WhatsAppErrorLog.name,schema:WhatsAppErrorLogSchema},
  ])
],
  controllers: [WhatsappSqsController],
  providers: [WhatsappSqsService,WhatsappLogService,WhatsappTrigger,WhatsappStatusService]
})
export class WhatsappSqsModule {}
