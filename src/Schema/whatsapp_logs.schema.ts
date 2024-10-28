import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class DateRange {
  @Prop({ required: false, omitUndefined: true })
  start?: string;

  @Prop({ required: false, omitUndefined: true })
  end?: string;
}

@Schema()
export class whatsapp_logs extends Document {
  @Prop({ required: false, omitUndefined: true })
  awbNo?: string;

  @Prop({ required: false, omitUndefined: true })
  created_at?: string;

  @Prop({ required: false, omitUndefined: true })
  customerName?: string;

  @Prop({ required: false, omitUndefined: true })
  EventDateAndTime?: string;

  @Prop({ required: false, omitUndefined: true })
  order_id?: string;

  @Prop({ required: false, omitUndefined: true })
  phoneNo?: string;

  @Prop({ required: false, omitUndefined: true })
  blockedForUser_status?: string;

  @Prop({ required: false, omitUndefined: true, type: DateRange })
  dateRange?: DateRange;

  @Prop({ required: false, omitUndefined: true })
  deferred_status?: string;

  @Prop({ default: '' })
  details?: string;

  @Prop({ default: '' })
  errorcode?: string;

  @Prop({ required: false, omitUndefined: true })
  other_status?: string;

  @Prop({ required: false, omitUndefined: true })
  phone?: string;

  @Prop({ required: false, omitUndefined: true })
  read_status?: string;

  @Prop({ required: false, omitUndefined: true })
  sent_status?: string;

  @Prop({ required: false, omitUndefined: true })
  status?: string;

  @Prop({ required: false, omitUndefined: true })
  success_status?: string;

  @Prop({ required: true})
  templateName?: string;

  @Prop({ required: false, omitUndefined: true })
  trackURL?: string;

  @Prop({ required: false, omitUndefined: true })
  trigger_date_and_time?: string;

  @Prop({ required: false, omitUndefined: true })
  twentyFourHourExceeded_status?: string;

  @Prop({ required: false, omitUndefined: true })
  unknownSubscriber_status?: string;

  @Prop({ required: false, omitUndefined: true })
  invoiceUrl?: string;
}

export const WhatsapplogSchema = SchemaFactory.createForClass(whatsapp_logs);

// Pre-save hook to remove undefined values
WhatsapplogSchema.pre('save', function (next) {
  const doc = this.toObject();
  Object.keys(doc).forEach((key) => {
    if (doc[key] === undefined) {
      delete doc[key];
    }
  });
  next();
});
