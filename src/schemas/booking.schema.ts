import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type bookingDocument = HydratedDocument<booking>;

@Schema()
export class booking {
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  serviceName: string;
  @Prop({ required: true })
  reqTherapist: number;
  @Prop({ required: true })
  duration: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  therapistName: string;
  @Prop({ required: true })
  startTime: string;
  @Prop({ required: true })
  endTime: string;
  @Prop({ required: true })
  clientName: string;
  @Prop({ required: true })
  clientContact: number;
  @Prop({ required: true })
  clientEmail: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  serviceFee: number;
  @Prop({ required: true })
  discount: number;
  @Prop({ required: true })
  totalFee: number;
  @Prop({ required: true })
  paidWith: string;
  @Prop({ required: true })
  details: string;
}

export const BookingSchema = SchemaFactory.createForClass(booking); 