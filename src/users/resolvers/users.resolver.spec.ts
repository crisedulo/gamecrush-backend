import { UsersResolver } from './users.resolver';
import { CreateUserUseCase } from '../domain/use-cases/create-user.usecase';
import { FindUserByEmailUseCase } from '../domain/use-cases/find-user-by-email.usecase';
import { GetProfileUseCase } from '../domain/use-cases/get-profile.usecase';
import { UpdateProfileUseCase } from '../domain/use-cases/update-profile.usecase';

describe('UsersResolver', () => {
  it('calls CreateUserUseCase on createUser', async () => {
    const create = { execute: jest.fn().mockResolvedValue({ id: '1' }) } as unknown as CreateUserUseCase;
    const find = {} as FindUserByEmailUseCase;
    const get = {} as GetProfileUseCase;
    const upd = {} as UpdateProfileUseCase;
    const resolver = new UsersResolver(create, find, get, upd);
    const input: any = {
      gamerTag: 'tag',
      email: 'e@mail.com',
      password: 'pass',
      termsAccepted: true,
    };
    await resolver.createUser(input);
    expect(create.execute).toHaveBeenCalledWith(input);
  });

  it('calls FindUserByEmailUseCase on getUserByEmail', async () => {
    const create = {} as CreateUserUseCase;
    const find = { execute: jest.fn().mockResolvedValue({ id: '1' }) } as unknown as FindUserByEmailUseCase;
    const get = {} as GetProfileUseCase;
    const upd = {} as UpdateProfileUseCase;
    const resolver = new UsersResolver(create, find, get, upd);
    await resolver.getUserByEmail({ email: 'test@example.com' });
    expect(find.execute).toHaveBeenCalledWith('test@example.com');
  });

  it('calls GetProfileUseCase on getMyProfile', async () => {
    const create = {} as CreateUserUseCase;
    const find = {} as FindUserByEmailUseCase;
    const get = { execute: jest.fn().mockResolvedValue({ id: '1' }) } as unknown as GetProfileUseCase;
    const upd = {} as UpdateProfileUseCase;
    const resolver = new UsersResolver(create, find, get, upd);
    await resolver.getMyProfile({ user: { sub: '1' } } as any);
    expect(get.execute).toHaveBeenCalledWith('1');
  });

  it('calls UpdateProfileUseCase on updateMyProfile', async () => {
    const create = {} as CreateUserUseCase;
    const find = {} as FindUserByEmailUseCase;
    const get = {} as GetProfileUseCase;
    const upd = { execute: jest.fn().mockResolvedValue({ id: '1' }) } as unknown as UpdateProfileUseCase;
    const resolver = new UsersResolver(create, find, get, upd);
    await resolver.updateMyProfile({ user: { sub: '1' } } as any, {} as any);
    expect(upd.execute).toHaveBeenCalledWith('1', {} as any);
  });
});
