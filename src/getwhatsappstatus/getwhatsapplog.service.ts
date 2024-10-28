import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { whatsapp_logs } from 'src/Schema/whatsapp_logs.schema';

@Injectable()
export class GetWhatsappLog {
  constructor(
    @InjectModel(whatsapp_logs.name)
    private whatsappLogModel: Model<whatsapp_logs>,
  ) {}

  async getwhatsapplogs(createdAt: string) {
     console.log(createdAt);
    if (!createdAt) {
        throw new Error("Please provide the 'created_at' parameter.");
      }

      const filter = { created_at: { $regex: createdAt, $options: 'i' } };

      const projection = {
        orderId: "", 
        sent_status: "",
        success_status: "",
        read_status: "",
        blockedForUser_status: "",
        templateName: "",
        phone: "",
        whatsappstatus: "",
        errorcode: "",
        other_status: "",
        deferred_status: "",
        twentyFourHourExceeded_status: "",
        unknownSubscriber_status: "",
        created_at: "",
        details: "",
      };
  
      // Query all logs based on filter
      const items = await this.whatsappLogModel.find(filter, projection).exec();

      // Counters
      let totalTemplates = {
        orderReceiveTemplate: 0,
        shippedTemplate: 0,
        invoiceTemplate: 0,
        orderReceiveEdd: 0,
      };
      let successCounts = { ...totalTemplates };
      let errorCounts = { ...totalTemplates };
      let sentCounts = 0;
      let readCounts = 0;
      let successCountsStatus = 0;
      let errorCount = 0;

      // Counting logic
      items.forEach((item) => {
        if (totalTemplates[item.templateName] !== undefined) {
          totalTemplates[item.templateName]++;
        }

        if (item.status === 'success') {  
          successCounts[item.templateName]++;
        } else {
          errorCounts[item.templateName]++;
        }

        if (item.sent_status === 'yes') sentCounts++; 
        if (item.read_status === 'yes') readCounts++; 
        if (item.success_status === 'yes') successCountsStatus++; 

        if (
          item.other_status === 'yes' || 
          item.twentyFourHourExceeded_status === 'yes' || 
          item.unknownSubscriber_status === 'yes' || 
          item.deferred_status === 'yes' || 
          item.blockedForUser_status === 'yes' 
        ) {
          errorCount++;
        }
      });

      return {
        items,
        totalTemplates,
        successCounts,
        errorCounts,
        sentCounts,
        readCounts,
        successCountsStatus,
        errorCount,
        totalHits: items.length,
      };
  }

  async getLogsInRange(startDate: string, endDate: string) {
    if (!startDate || !endDate) {
      throw new Error("Please provide both 'start_date' and 'end_date' parameters.");
    }

    const start = new Date(`${startDate}T00:00:00.000+05:30`);
    const end = new Date(`${endDate}T23:59:59.999+05:30`);

    const logs = await this.whatsappLogModel.find({
      created_at: { $gte: start, $lte: end },
    }).lean();

    const result = {};

    logs.forEach((log) => {
      const date = log.created_at.split('T')[0];
      if (!result[date]) {
        result[date] = {
          totalhits: 0,
          orderReceiveTemplate: this.initializeTemplateStats(),
          shippedTemplate: this.initializeTemplateStats(),
          deliveredTemplate: this.initializeTemplateStats(),
          orderReceiveEdd: this.initializeTemplateStats(),
          installationNotification: this.initializeTemplateStats(),
        };
      }

      const templateStats = result[date][log.templateName] || this.initializeTemplateStats();

      templateStats.hitcount++;
      if (log.success_status === 'Yes') templateStats.success++;
      if (log.sent_status === 'Yes') templateStats.sent++;
      if (log.read_status === 'Yes') templateStats.read++;
      if (log.other_status === 'Yes') templateStats.other++;
      if (log.unknownSubscriber_status === 'Yes') templateStats.unknown_subscriber++;
      if (log.deferred_status === 'Yes') templateStats.deferred++;
      if (log.blockedForUser_status === 'Yes') templateStats.blocked_for_user++;
      if (log.twentyFourHourExceeded_status === 'Yes') templateStats.hour_exceeded++;

      result[date].totalhits++;
      result[date][log.templateName] = templateStats;
    });

    return { logs, result };
  }

  private initializeTemplateStats() {
    return {
      hitcount: 0,
      success: 0,
      sent: 0,
      read: 0,
      other: 0,
      unknown_subscriber: 0,
      deferred: 0,
      blocked_for_user: 0,
      hour_exceeded: 0,
    };
  }
}
