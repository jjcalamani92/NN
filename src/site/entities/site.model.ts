import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AbstractModel } from 'src/common/abstract/abstract.model';
import { Page } from './page.model';
import { Section } from './section.model';
import { AbstractDocument } from '../../common/abstract/abstract.schema';

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
  @Field(() => [Params])
  readonly params: Params[];

  @Field(() => [PagePrimary])
  readonly pagePrimary: PagePrimary[];

  @Field(() => [PageSecondary], { nullable: true })
  readonly pageSecondary: PageSecondary[];

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

  // @Field(() => GraphQLJSONObject, { nullable: true })
  // readonly
  // @Field(() => Params, { nullable: true })
  // @Field(() => Params)
  // params: Params;
}


@ObjectType()
export class Params {
  @Field()
  readonly category: string;
  @Field()
  readonly subCategory: string;
}
