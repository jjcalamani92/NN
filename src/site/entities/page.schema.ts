import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../common/abstract/abstract.schema';
import { Section } from './section.model';
import { SectionSchema } from './section.schema';

@Schema()
export class PageDocument extends AbstractDocument {
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

export const PageSchema = SchemaFactory.createForClass(PageDocument);
PageSchema.pre<PageDocument>('save', function (next) {
  this.title = this.title.toLowerCase();
  next();
});