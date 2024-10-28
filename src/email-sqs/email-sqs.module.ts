import { Module } from '@nestjs/common';
import { EmailSqsController } from './email-sqs.controller';
import { EmailSqsService } from './email-sqs.service';
import {EmailLogService} from '../Services/email_logs.service'
import { MongooseModule } from '@nestjs/mongoose';
import { emailLogs, EmailLogSchema } from 'src/Schema/email_logs.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: emailLogs.name, schema: EmailLogSchema },
  ])],
  controllers: [EmailSqsController],
  providers: [EmailSqsService,EmailLogService]
})
export class EmailSqsModule {}
