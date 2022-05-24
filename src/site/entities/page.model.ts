import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract/abstract.model';

@ObjectType()
export class Page extends AbstractModel {
  @Field()
  readonly title: string;
  @Field()
  readonly href: string;
  @Field()
  readonly description: string;
  @Field()
  readonly image: string;
  @Field()
  readonly imageAlt: string;
}
