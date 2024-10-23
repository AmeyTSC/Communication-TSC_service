import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class WhatsAppErrorLog extends Document {

  @Prop()
  date_and_time: string;  // Date and time when the error occurred (ISO format)

  @Prop()
  error: string;  // Error message

  @Prop()
  order_id: string;  // Order ID related to the error
}

export const WhatsAppErrorLogSchema = SchemaFactory.createForClass(WhatsAppErrorLog);
WhatsAppErrorLogSchema.set('strict', false);