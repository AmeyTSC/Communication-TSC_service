import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class DateRange {
    @Prop()
    start: string;  
  
    @Prop()
    end: string;
}

@Schema()
export class WhatsAppHitLog extends Document {
 
  @Prop()
  id:string;
  
  @Prop()
  awbNo: string;  // Airway Bill Number

  @Prop()
  blockedForUser_status: string;  // Status for blocked user (Yes/No)

  @Prop()
  created_at: string;  // Creation timestamp

  @Prop()
  customerName: string;  // Customer's name

  @Prop()  // Optional date range sub-document
  dateRange: DateRange;

  @Prop()
  deferred_status: string;  // Deferred status (Yes/No)

  @Prop({ default: '' })
  details: string;  // Details (optional, can be an empty string)

  @Prop({ default: '' })
  errorcode: string;  // Error code (optional, can be an empty string)

  @Prop()
  order_id: string;  // Order ID

  @Prop()
  other_status: string;  // Other status (Yes/No)

  @Prop()
  phone: string;  // Customer's phone number

  @Prop()
  phoneNo: string;  // Customer's phone number with country code

  @Prop()
  read_status: string;  // Read status (Yes/No)

  @Prop()
  sent_status: string;  // Sent status (Yes/No)

  @Prop()
  status: string;  // General status (e.g., "success")

  @Prop()
  success_status: string;  // Success status (Yes/No)

  @Prop()
  templateName: string;  // Template name used

  @Prop()
  trackURL: string;  // Optional tracking URL

  @Prop()
  trigger_date_and_time: string;  // Date and time of the trigger (ISO format)

  @Prop()
  twentyFourHourExceeded_status: string;  // 24-hour exceeded status (Yes/No)

  @Prop()
  unknownSubscriber_status: string;  // Unknown subscriber status (Yes/No)
}

export const WhatsAppHitLogSchema = SchemaFactory.createForClass(WhatsAppHitLog);
WhatsAppHitLogSchema.set('strict', false);