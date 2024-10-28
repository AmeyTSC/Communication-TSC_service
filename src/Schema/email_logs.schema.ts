import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

@Schema({ _id: false })
export class DateRange {
  @Prop()
  start: string;

  @Prop()
  end: string;
}


@Schema()
export class emailLogs extends Document {
  @Prop()
  id: string;

  @Prop({ required: false, omitUndefined: true })
  billing_address?: Address;

  @Prop({ required: false, omitUndefined: true })
  created_at?: string;

  @Prop({ required: false, omitUndefined: true })
  customerEmail?: string;

  @Prop({ required: false, omitUndefined: true })
  customerName?: string;

  @Prop({ type: DateRange })
  dateRange?: DateRange;

  @Prop({ required: false, omitUndefined: true })
  discount_codes?: string;

  @Prop({ required: false, omitUndefined: true })
  order_id?: string;

  @Prop({ required: false, omitUndefined: true })
  price_after_discount?: string;

  @Prop({ required: false, omitUndefined: true })
  price_before_discount?: string;

  @Prop({ required: false, omitUndefined: true })
  shipping_address?: Address;

  @Prop({ required: false, omitUndefined: true })
  shopify_id?: number;

  @Prop({ required: false, omitUndefined: true })
  tags?: string;

  @Prop({required: true})
  templateName: string;

  @Prop({ required: false, omitUndefined: true })
  timeanddate?: string;

  @Prop({ required: false, omitUndefined: true })
  total_discounts?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
export const DateRangeSchema = SchemaFactory.createForClass(DateRange);
export const EmailLogSchema = SchemaFactory.createForClass(emailLogs);
EmailLogSchema.pre('save', function (next) {
  const doc = this.toObject();
  Object.keys(doc).forEach((key) => {
    if (doc[key] === undefined) {
      delete doc[key];
    }
  });
  next();
});
