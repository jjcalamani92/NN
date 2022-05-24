import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';
import { Site } from '../../site/entities/site.model';

@ObjectType()
export class Product extends AbstractModel {
  @Field()
  readonly title: string;
  @Field()
  readonly brand: string;
  @Field()
  readonly description: string;
  @Field(() => [String])
  readonly image: string[];
  @Field()
  readonly inStock: number;
  @Field({ nullable: true })
  readonly slug: string;
  @Field()
  readonly category: string;
  @Field()
  readonly subCategory: string;
  @Field()
  readonly price: number;
  @Field(() => [String], { nullable: true })
  readonly tags: string[];
  @Field(() => Site)
  readonly site: Site | string;

  @Field({ nullable: true })
  readonly status: boolean;
}
