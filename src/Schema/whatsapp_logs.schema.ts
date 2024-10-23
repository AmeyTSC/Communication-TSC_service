import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class whatsapp_logs extends Document {

  @Prop()
  awbNo: string;  

  @Prop()
  created_at: string;  

  @Prop()
  customerName: string;  

  @Prop()
  EventDateAndTime: string;  

  @Prop()
  order_id: string; 

  @Prop()
  phoneNo: string;

  @Prop({ required: true })
  templateName: string;  
}

export const WhatsapplogSchema = SchemaFactory.createForClass(whatsapp_logs);
WhatsapplogSchema.set('strict', false);
