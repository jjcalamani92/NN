import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { slug } from 'src/common/utils/function';
import { ProductDocument } from './product.schema';

@Schema({ timestamps: true, versionKey: false })
export class WearDocument extends ProductDocument {
  @Prop({
    trim: true,
  })
  color: string;
  @Prop(() => [String])
  sizes: string[];
}
export const WearSchema = SchemaFactory.createForClass(WearDocument);

WearSchema.pre<WearDocument>('save', function (next) {
  this.title = this.title;
  this.brand = this.brand.toLowerCase();
  this.category = this.category.toLowerCase();
  this.subCategory = this.subCategory.toLowerCase();
  this.color = this.color.toLowerCase();
  this.slug = slug(this.title);
  next();
});
