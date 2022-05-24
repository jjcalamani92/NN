import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  @IsEmail({}, { message: 'Invalid email message' })
  email: string;

  @Field(() => String)
  @MinLength(6)
  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @Field(() => String)
  @IsIn(['ADMIN_ROL', 'USER_ROL', 'CLIENT_ROL', 'VENTAS_ROL'])
  @IsNotEmpty()
  @IsString()
  role: string;
  status: boolean;
  google: boolean;
  sites: string[]
}
