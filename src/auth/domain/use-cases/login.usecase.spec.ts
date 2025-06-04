import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from './login.usecase';
import { IUserRepository } from '../../../users/domain/repositories/user.repository';

function hash(password: string, salt: string) {
  const { scryptSync } = require('crypto');
  return scryptSync(password, salt, 32).toString('hex');
}

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let repo: jest.Mocked<IUserRepository>;
  let jwt: JwtService;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findByGamerTag: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    } as any;
    jwt = { sign: jest.fn(), verify: jest.fn() } as any;
    useCase = new LoginUseCase(repo, jwt);
  });

  it('returns token for valid credentials', async () => {
    const salt = 'salt';
    repo.findByEmail.mockResolvedValue({ id: '1', email: 'a@a.com', password: `${salt}.${hash('pass', salt)}` } as any);
    (jwt.sign as jest.Mock).mockReturnValue('token');

    const token = await useCase.execute('a@a.com', 'pass');
    expect(token).toBe('token');
    expect(jwt.sign).toHaveBeenCalled();
  });

  it('throws when invalid password', async () => {
    const salt = 'salt';
    repo.findByEmail.mockResolvedValue({ id: '1', email: 'a@a.com', password: `${salt}.${hash('pass', salt)}` } as any);
    await expect(useCase.execute('a@a.com', 'wrong')).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('throws when user not found', async () => {
    repo.findByEmail.mockResolvedValue(null);
    await expect(useCase.execute('a@a.com', 'pass')).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
