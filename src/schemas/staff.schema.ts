import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type staffDocument = HydratedDocument<staff>;

@Schema()
export class staff {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  gender: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  currentAddress: string;
  @Prop({ required: true })
  designation: string;
  @Prop({ required: true })
  staffId: string;
  @Prop({ required: true })
  contact: number;
  @Prop({ required: true })
  dob: Date;
}

export const CatSchema = SchemaFactory.createForClass(staff);
