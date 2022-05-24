import { ArgsType, Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { GetPageArgs } from './create-page.input';

@InputType()
export class CreateSectionInput {
  @Field()
  site: string;

  @Field()
  @IsString()
  category: string;

  @Field()
  @IsString()
  subCategory: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  image: string;

  @Field()
  @IsString()
  imageAlt: string;

  // @Field()
  // params: Params;
}

@InputType()
export class UpdateSectionInput extends PartialType(CreateSectionInput) {
  @Field(() => ID)
  readonly _id: string;
}

@ArgsType()
export class GetSectionArgs extends GetPageArgs {}
