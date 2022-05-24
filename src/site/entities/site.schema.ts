import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../common/abstract/abstract.schema';
import { PagePrimary, PageSecondary, Params } from './site.model';

@Schema({ timestamps: true, versionKey: false })
export class SiteDocument extends AbstractDocument {
  @Prop({
    required: true,
  })
  title: string;

  @Prop()
  domain: string;

  @Prop()
  logo: string;

  @Prop()
  numberPhone: string;

  @Prop()
  address: string;

  @Prop()
  categoryPage: string;

  @Prop([Params])
  params: Params[];

  @Prop([PagePrimary])
  pagePrimary: PagePrimary[];

  @Prop([PageSecondary])
  pageSecondary: PageSecondary[];

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