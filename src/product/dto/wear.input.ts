import { Field, InputType, PartialType, ID, ArgsType } from '@nestjs/graphql';
import { ProductInput, GetProductArgs } from './product.input';

@InputType()
export class CreateWearInput extends ProductInput {
  @Field()
  color: string;
  @Field(() => [String], { nullable: true })
  sizes: string[];
}

@InputType()
export class UpdateWearInput extends PartialType(CreateWearInput) {
  @Field({ nullable: true })
  status: boolean;
}

@ArgsType()
export class GetWearArgs extends PartialType(GetProductArgs) {}
