import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { whatsapp_logs } from '../Schema/whatsapp_logs.schema';

@Injectable()
export class WhatsappstatusService {
    constructor(
        @InjectModel(whatsapp_logs.name)
        private whatsappLogModel: Model<whatsapp_logs>,
    ) {}

  async getWhatsappLogByPhone(phone: string): Promise<any> {
    if (!phone) {
      throw new Error("Phone number is required to query.");
    }

    try {
      const logs = await this.whatsappLogModel.find({ phone }).select('phone whatsappstatus').exec();
      if (!logs || logs.length === 0) {
        throw new NotFoundException(`No logs found for phone number: ${phone}`);
      }
      console.log("Query successful:", logs);
      return logs;
    } catch (error) {
      console.error("Error querying WhatsApp logs:", error);
      throw new Error(`Failed to query WhatsApp logs: ${error.message}`);
    }
  }
}
