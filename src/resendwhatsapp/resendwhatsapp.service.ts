import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { whatsapp_logs } from '../Schema/whatsapp_logs.schema';
import { format } from 'date-fns-tz';
import { Model } from 'mongoose';
import { getTemplateDetail } from 'src/utils/whatsapp_template.attributes';
import { smsSent } from 'src/utils/sms_sent';

@Injectable()
export class ResendwhatsappService {
  constructor(
    @InjectModel(whatsapp_logs.name)
    private whatsappLogModel: Model<whatsapp_logs>,
  ) {}

  async processWhatsappLogs(): Promise<void> {
    console.log("fetching")
    try {
      // Get the current date formatted
      const timeZone = 'Asia/Kolkata';
      const now = new Date();
      const formattedDate = format(now, 'yyyy-MM-dd', { timeZone });

      // MongoDB query to find the logs with error status and created_at matching the formatted date
      const logs = await this.whatsappLogModel.find({
        whatsappstatus: 'error',
        created_at: { $regex: formattedDate }, // Regex to filter logs by the date part
      }).exec();

      // Iterate through logs and process each one
      for (const log of logs) {
        const templateAttributes = {
          templateName: log.templateName || '',
          invoiceUrl: log.invoiceUrl || '',
          order_id: log.order_id || '',
          customerName: log.customerName || '',
          dateRange: {
            start: log.dateRange?.start || '',
            end: log.dateRange?.end || '',
          },
          trackURL: log.awbNo
            ? `https://thesleepcompany.clickpost.ai/?waybill=${log.awbNo}`
            : '',
          phoneNo: log.phone || '',
        };

        try {
          // Assuming the function 'smsSent' is part of an SMS service
          const templateInfo = getTemplateDetail(templateAttributes);
          const whatsappResponse = await smsSent(templateInfo);

          // Update the log's whatsappstatus field based on the response
          await this.whatsappLogModel.updateOne(
            { _id: log._id }, // Filter to update the correct log by its ID
            { $set: { whatsappstatus: whatsappResponse.response.status } }, // Set the new status
          );
        } catch (err) {
          console.error(`Error processing log with ID ${log._id}:`, err.message);
        }
      }
    } catch (err) {
      console.error('Error fetching logs:', err.message);
    }
  }
}
