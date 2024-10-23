import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WhatsAppErrorLog } from 'src/Schema/whatsapp_error.schema';
import { WhatsAppHitLog } from 'src/Schema/whatsapp_hits.schema';

const DEFAULT_GUPSHUP_ATTRIBUTES = {
  success_status: 'No',
  sent_status: 'No',
  read_status: 'No',
  other_status: 'No',
  unknownSubscriber_status: 'No',
  deferred_status: 'No',
  blockedForUser_status: 'No',
  twentyFourHourExceeded_status: 'No',
  errorcode: '',
};

const getTriggerDateAndTime = () => {
  return new Date(Date.now() + 5.5 * 60 * 60 * 1000)
    .toISOString()
    .replace('Z', '+05:30');
};

@Injectable()
export class WhatsappTrigger {
  constructor(
    @InjectModel(WhatsAppHitLog.name)
    private whatsapphit: Model<WhatsAppHitLog>,
    @InjectModel(WhatsAppErrorLog.name)
    private whatsapperror: Model<WhatsAppErrorLog>,
  ) {}

  async whatsapphit_log(whatsapp_response: any, reqObject: any) {
    try {
      // Create the new WhatsApp hit log entry
      const hitLog = new this.whatsapphit({
        id: whatsapp_response.response.id,
        ...whatsapp_response.response,
        ...reqObject.template_attributes,
        ...DEFAULT_GUPSHUP_ATTRIBUTES,
        trigger_date_and_time: getTriggerDateAndTime(),
      });

      // Save the log entry to MongoDB
      const savedLog = await hitLog.save();
      console.log(savedLog);

      return {
        statusCode: 200,
        message: 'WhatsApp hit log created successfully.',
        data: savedLog,
      };
    } catch (error) {
      console.error('Failed to log WhatsApp hit:', error.message);
      throw new Error(`Failed to log WhatsApp hit: ${error.message}`);
    }
  }

  // WhatsApp Error Log Function
  async whatsapperror_log(Id: string, errorMsg: string) {
    try {
      const errorLog = new this.whatsapperror({
        order_id: Id,
        error: errorMsg,
        date_and_time: getTriggerDateAndTime(),
      });

      // Save the error log entry to MongoDB
      const savedErrorLog = await errorLog.save();

      return {
        statusCode: 200,
        message: 'WhatsApp error log created successfully.',
        data: savedErrorLog,
      };
    } catch (error) {
      console.error('Failed to log WhatsApp error:', error.message);
      return {
        statusCode: 500,
        message: 'Failed to log WhatsApp error',
        error: error.message,
      };
    }
  }
}
