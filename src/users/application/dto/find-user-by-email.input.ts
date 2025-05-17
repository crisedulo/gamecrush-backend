import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class FindUserByEmailInput {
  @Field()
  @IsEmail()
  email: string;
}
