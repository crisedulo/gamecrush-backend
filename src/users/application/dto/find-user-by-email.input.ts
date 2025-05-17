import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class FindUserByEmailInput {
  @Field()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
