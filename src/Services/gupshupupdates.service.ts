import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WhatsAppHitLog } from 'src/Schema/whatsapp_hits.schema';

@Injectable()
export class GupshupUpdateStatus {
  constructor(
    @InjectModel(WhatsAppHitLog.name)
    private whatsappHitModel: Model<WhatsAppHitLog>,
  ) {}

  async UpdateGupshup(event: any): Promise<void> {
    try {
      const sqsRecord = event;
      const reqBody = JSON.parse(sqsRecord);
      const gupshup_data = reqBody.gupshup_data;

      const data = gupshup_data;
      const gupshupId = data.externalId;
      console.log('Gupshup ID: ', gupshupId);

      let fieldName: string;
      switch (data.errorCode) {
        case '000':
          fieldName = 'success_status';
          break;
        case '025':
          fieldName = 'sent_status';
          break;
        case '026':
          fieldName = 'read_status';
          break;
        case '020':
          fieldName = 'other_status';
          break;
        case '003':
          fieldName = 'unknownSubscriber_status';
          break;
        case '010':
          fieldName = 'deferred_status';
          break;
        case '022':
          fieldName = 'blockedForUser_status';
          break;
        case '101':
          fieldName = 'twentyFourHourExceeded_status';
          break;
        default:
          console.log(`Unrecognized errorCode: ${data.errorCode}`);
          return;
      }

      // console.log(`Field name to update: ${fieldName}`);

      // Update the MongoDB document based on externalId (gupshupId)
      const updateResult = await this.whatsappHitModel
        .findOneAndUpdate(
          { id: gupshupId }, // Query filter based on the external ID
          { $set: { [fieldName]: 'Yes' } }, // Update the selected field
          { new: true }, // Return the updated document
        )
        .exec();

      if (updateResult) {
        console.log('Update successful');
      } else {
        console.log(`No document found with id: ${gupshupId}`);
      }
    } catch (error) {
      console.error(`Error processing event: ${error.message}`);
    }
  }
}
