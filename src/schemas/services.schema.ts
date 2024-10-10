import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type serviceDocument = HydratedDocument<service>;

@Schema()
export class service {
  @Prop({ required: true })
  serviceName: string;
  @Prop({ required: true })
  reqTherapist: number;
  @Prop({ required: true })
  duration: string;
  @Prop({ required: true })
  price: number;
}

export const CatSchema = SchemaFactory.createForClass(service);