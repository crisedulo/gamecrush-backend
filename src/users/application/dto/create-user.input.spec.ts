import { validate } from 'class-validator';
import { CreateUserInput } from './create-user.input';

describe('CreateUserInput validation', () => {
  it('fails when favoriteGames contains non-string values', async () => {
    const input = new CreateUserInput();
    Object.assign(input, {
      gamerTag: 'Player',
      email: 'test@example.com',
      password: 'secret',
      favoriteGames: [123 as any],
      termsAccepted: true,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
  });
});
