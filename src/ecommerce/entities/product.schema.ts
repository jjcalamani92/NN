import { Prop, Schema } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import mongoose from 'mongoose';
import { Site } from '../../site/entities/site.model';

@Schema({ timestamps: true, versionKey: false })
export class ProductDocument extends AbstractDocument {
  @Prop({
    trim: true,
  })
  title: string;

  @Prop({
    trim: true,
  })
  brand: string;

  @Prop({
    trim: true,
  })
  description: string;

  @Prop([String])
  image: string[];

  @Prop({
    trim: true,
  })
  inStock: number;

  @Prop()
  slug: string;

  @Prop({
    trim: true,
  })
  category: string;

  @Prop({
    trim: true,
  })
  subCategory: string;

  @Prop({
    trim: true,
  })
  price: number;

  @Prop([String])
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Site.name })
  site: Site | string;

  @Prop({
    default: true,
  })
  status: boolean;
}
