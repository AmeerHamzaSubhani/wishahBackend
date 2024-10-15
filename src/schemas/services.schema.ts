import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type serviceDocument = HydratedDocument<services>;

@Schema()
export class services {
  @Prop({ required: true })
  serviceName: string;
  @Prop({ required: true })
  reqTherapist: number;
  @Prop({ required: true })
  duration: string;
  @Prop({ required: true })
  price: number;
}

export const ServicesSchema = SchemaFactory.createForClass(services);