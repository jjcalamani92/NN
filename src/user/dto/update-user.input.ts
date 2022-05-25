import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsEmail, IsMongoId, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  @IsString()
  @IsEmail({}, { message: 'Invalid email message' })
  email: string;
}
