import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateSectionInput {
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

  hrefCategory: string;
  hrefSubCategory: string;
}
