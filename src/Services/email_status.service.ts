import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailHit } from '../Schema/email_hits.schema';

@Injectable()
export class EmailReportService {
  private readonly logger = new Logger(EmailReportService.name);

constructor(
    @InjectModel(EmailHit.name) private readonly emailHitModel: Model<EmailHit>,
) {}

  async processEmailReport(event:any): Promise<void> {
    try {
      const sqsRecord = event.Records[0];
      const requestBody = JSON.parse(sqsRecord.body);
      const emailWebhookResponse = requestBody.emailrequestbody[0];
      const data = emailWebhookResponse.msys.message_event;

      if (!data.transmission_id) {
        console.log('Missing required field: transmission_id');
        return;
      }

      this.logger.log(`Processing transmission_id: ${data.transmission_id}`);

      await this.emailHitModel.findOneAndUpdate(
        { id: data.transmission_id },
        {
          $set: { sparkpost_status: data.type },
        },
        { new: true, upsert: false },
      );

      this.logger.log('Email hit log updated successfully');
    } catch (error) {
      console.error('Error processing event', error.stack);
    }
  }
}
