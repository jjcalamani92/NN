import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AbstractModel } from 'src/common/abstract/abstract.model';
import { Page } from './page.model';
import { Section } from './section.model';
import { AbstractDocument } from '../../common/abstract/abstract.schema';
import { Wear } from '../../product/entities/wear.model';

@ObjectType()
export class Site extends AbstractModel {
  @Field()
  readonly title: string;
  @Field()
  readonly domain: string;
  @Field()
  readonly logo: string;
  @Field()
  readonly numberPhone: string;
  @Field()
  readonly address: string;
  @Field()
  readonly categoryPage: string;
  
  @Field(() => [ParamsOne])
  readonly paramsOne: ParamsOne[];

  @Field(() => [ParamsTwo])
  readonly paramsTwo: ParamsTwo[];


  @Field(() => [PagePrimary])
  readonly pagePrimary: PagePrimary[];

  @Field(() => [PageSecondary], { nullable: true })
  readonly pageSecondary: PageSecondary[];

  @Field(() => [Wear])
  readonly wears: Wear[];
  @Field()
  readonly status: boolean;
}

@ObjectType()
export class PagePrimary {
  @Field()
  title: string;
  @Field()
  href: string;
  @Field()
  description: string;
  @Field()
  image: string;
  @Field()
  imageAlt: string;
}

@ObjectType()
export class PageSecondary {
  @Field()
  category: string;
  @Field()
  subCategory: string;
  @Field()
  description: string;
  @Field()
  image: string;
  @Field()
  imageAlt: string;
  @Field()
  hrefCategory: string;
  @Field()
  hrefSubCategory: string;
}


@ObjectType()
export class ParamsTwo {
  @Field()
  readonly category: string;
  @Field()
  readonly subCategory: string;
}

@ObjectType()
export class ParamsOne {
  @Field()
  readonly pages: string;
}
