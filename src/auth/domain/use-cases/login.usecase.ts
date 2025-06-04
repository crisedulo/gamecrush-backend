import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { scryptSync } from 'crypto';
import { IUserRepository, USER_REPOSITORY } from '../../../users/domain/repositories/user.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const [salt, storedHash] = user.password?.split('.') ?? [];
    const hash = scryptSync(password, salt, 32).toString('hex');
    if (hash !== storedHash) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.jwtService.sign({ sub: user.id, email: user.email });
  }
}
