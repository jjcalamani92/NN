import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract/abstract.model';
import { Wear } from '../../ecommerce/entities/wear.model';

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

  @Field(() => [Featured])
  readonly featured: Featured[];

  @Field(() => [Section])
  readonly sections: Section[];

  @Field(() => [Page])
  readonly pages: Page[];

  @Field(() => [String])
  readonly wears: Wear[];
  @Field()
  readonly status: boolean;
}

@ObjectType()
export class Category {
  @Field()
  name: string;

  @Field(() => [Featured])
  readonly featured: Featured[];

  @Field(() => [Section])
  readonly sections: Section[];
}

@ObjectType()
export class Featured {
  @Field()
  name: string;
  @Field()
  href: string;
  @Field()
  imageSrc: string;
  @Field()
  imageAlt: string;
}

@ObjectType()
export class Section {
  @Field()
  section: string;
  @Field()
  href_s: string;
  @Field()
  name: string;
  @Field()
  href_n: string;
  // @Field()
  // description_name:
}

@ObjectType()
export class Item {
  @Field()
  name: string;
  @Field()
  href: string;
}

@ObjectType()
export class Page extends Item {}
