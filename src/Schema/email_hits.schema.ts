import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class DateRange {
  @Prop()
  start: string;

  @Prop()
  end: string;
}

@Schema({ _id: false })
export class Address {
  @Prop()
  address1: string;

  @Prop()
  address2?: string;

  @Prop()
  city: string;

  @Prop()
  company?: string | null;

  @Prop()
  country: string;

  @Prop()
  country_code: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name?: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  province: string;

  @Prop()
  province_code: string;

  @Prop()
  zip: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}

@Schema()
export class EmailHit extends Document {
  @Prop()
  id: string;

  @Prop()
  billing_address: Record<string, any>; // Use an appropriate sub-schema or detailed fields if needed

  @Prop()
  created_at: string;

  @Prop()
  customerEmail: string;

  @Prop()
  customerName: string;

  @Prop()
  dateRange: DateRange; // Define as detailed sub-schema if dateRange has specific fields

  @Prop()
  discount_codes: string;

  @Prop()
  order_id: string;

  @Prop()
  price_after_discount: string;

  @Prop()
  price_before_discount: string;

  @Prop([Object]) // Array of objects for product details
  productsData: Array<Record<string, any>>;

  @Prop()
  shipping_address: Record<string, any>; // Define as sub-schema if needed for structured fields

  @Prop()
  shopify_id: number;

  @Prop()
  tags: string;

  @Prop({ required: true })
  templateName: string;

  @Prop()
  total_accepted_recipients: number;

  @Prop()
  total_discounts: string;

  @Prop()
  total_rejected_recipients: number;

  @Prop()
  trigger_date_and_time: string;
}

export const EmailHitSchema = SchemaFactory.createForClass(EmailHit);
