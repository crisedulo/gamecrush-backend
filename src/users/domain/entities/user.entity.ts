export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly gamerTag: string,
    public readonly email: string,
    public readonly password?: string,
    public readonly favoriteGames: string[] = [],
    public readonly platforms: string[] = [],
    public readonly genres: string[] = [],
    public readonly country: string = '',
    public readonly available: boolean = true,
    public readonly hasMic: boolean = false,
    public readonly showGamerTag: boolean = true,
    public readonly photos: string[] = [],
    public readonly styleOfPlay: string = 'Casual',
    public readonly availability: string[] = [],
    public readonly languages: string[] = [],
    public readonly termsAccepted: boolean = false,
  ) {}
}
