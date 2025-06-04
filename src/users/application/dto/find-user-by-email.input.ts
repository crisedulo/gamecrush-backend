import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class FindUserByEmailInput {
  @Field()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;
}
