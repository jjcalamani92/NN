import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { AbstractDocument } from '../../common/abstract/abstract.schema';

@Schema()
export class SectionDocument extends AbstractDocument {
  @Prop()
  title: string;

  @Prop()
  href: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  imageAlt: string;

}

export const SectionSchema = SchemaFactory.createForClass(SectionDocument);
SectionSchema.pre<SectionDocument>('save', function (next) {
  this.title = this.title.toLowerCase();
  next();
});
