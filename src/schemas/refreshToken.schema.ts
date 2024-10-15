import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

@Schema()
export class RefreshToken {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  Token: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
  @Prop({ required: true })
  expiryDate: string;
}
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
