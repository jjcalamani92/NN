import { InputType, Field, PartialType, ID, ArgsType } from '@nestjs/graphql';
import { IsMongoId, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePageInput {
  @Field()
  @IsString()
  title: string;

  href: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  image: string;

  @Field()
  @IsString()
  imageAlt: string;

}

// @InputType()
// export class UpdatePageInput extends PartialType(CreatePageInput) {
//   @Field(() => ID)
//   @IsMongoId()
//   readonly _id: string;
// }

// @ArgsType()
// export class GetPageArgs {
//   @Field()
//   @IsMongoId()
//   @IsString()
//   @IsNotEmpty()
//   _id: string;
// }
