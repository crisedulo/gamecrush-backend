import { UsersResolver } from './users.resolver';
import { CreateUserUseCase } from '../domain/services/create-user.usecase';
import { FindUserByEmailUseCase } from '../domain/services/find-user-by-email.usecase';

describe('UsersResolver', () => {
  it('calls CreateUserUseCase on createUser', async () => {
    const create = { execute: jest.fn().mockResolvedValue({ id: '1' }) } as unknown as CreateUserUseCase;
    const find = {} as FindUserByEmailUseCase;
    const resolver = new UsersResolver(create, find);
    const input: any = { gamerTag: 'tag', email: 'e@mail.com', password: 'pass', termsAccepted: true };
    await resolver.createUser(input);
    expect(create.execute).toHaveBeenCalledWith(input);
  });

  it('calls FindUserByEmailUseCase on getUserByEmail', async () => {
    const create = {} as CreateUserUseCase;
    const find = { execute: jest.fn().mockResolvedValue({ id: '1' }) } as unknown as FindUserByEmailUseCase;
    const resolver = new UsersResolver(create, find);
    await resolver.getUserByEmail({ email: 'test@example.com' });
    expect(find.execute).toHaveBeenCalledWith('test@example.com');
  });
});
