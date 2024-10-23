import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { whatsapp_logs } from '../Schema/whatsapp_logs.schema';
import { format } from 'date-fns-tz';
import { Model } from 'mongoose';

@Injectable()
export class WhatsappLogsave {
  constructor(
    @InjectModel(whatsapp_logs.name)
    private whatsappLogModel: Model<whatsapp_logs>,
  ) {}

  async createLog(
    whatsapp_response: any,
    template_attributes: any,
  ): Promise<whatsapp_logs> {
    try {
      // Destructure the response attributes from the WhatsApp response
      const {
        phone,
        details,
        id: whatsappId,
        status: whatsappstatus,
      } = whatsapp_response.response;

      const gupshupattribute = {
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

      delete template_attributes.phoneNo;

      const timeZone = 'Asia/Kolkata';
      const now = new Date();
      const formattedDate = format(now, 'yyyy-MM-dd', { timeZone });

      // Set the log data
      const logData = {
        phone,
        details,
        whatsappId,
        whatsappstatus,
        ...template_attributes,
        ...gupshupattribute,
        created_at: new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
          .toISOString()
          .replace('Z', '+05:30'),
        date: formattedDate,
      };

      // Save the log data to MongoDB
      
      const log = new this.whatsappLogModel(logData);
      console.log(log);
      return await log.save();
    } catch (error) {
      throw new Error(`Error logging WhatsApp response: ${error.message}`);
    }
  }
}
