import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../common/abstract/abstract.schema';
// import { Category, Page } from './site.model';
import mongoose from 'mongoose';
import { Wear } from '../../ecommerce/entities/wear.model';
import { Category, Featured, Page, Section } from './site.model';

@Schema({ timestamps: true, versionKey: false })
export class SiteDocument extends AbstractDocument {
  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    trim: true,
  })
  domain: string;

  @Prop({
    trim: true,
  })
  logo: string;

  @Prop({
    trim: true,
  })
  numberPhone: string;

  @Prop({
    trim: true,
  })
  address: string;

  @Prop({
    trim: true,
  })
  categoryPage: string;

  @Prop([Featured])
  featured: Featured[];

  @Prop([Section])
  sections: Section[];

  @Prop([Page])
  pages: Page[];

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Wear' } })
  wears: Wear[];

  @Prop({
    default: true,
  })
  status: boolean;
}

export const SiteSchema = SchemaFactory.createForClass(SiteDocument);
SiteSchema.pre<SiteDocument>('save', function (next) {
  this.title = this.title.toLowerCase();
  this.domain = this.domain.toLowerCase();
  next();
});
