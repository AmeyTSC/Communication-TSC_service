import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { whatsapp_logs } from '../Schema/whatsapp_logs.schema';

@Injectable()
export class WhatsappLogService {
  constructor(
    @InjectModel(whatsapp_logs.name)
    private whatsappLogModel: Model<whatsapp_logs>,
  ) {}

  async createLog(data: any): Promise<whatsapp_logs> {
    const logEntry = new this.whatsappLogModel({
      ...data,
      created_at: new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
        .toISOString()
        .replace('Z', '+05:30'),
    });
    return logEntry.save();
  }
}
