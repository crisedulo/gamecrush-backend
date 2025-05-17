export class GameEntity {
  constructor(
    public id: string,
    public name: string,
    public genre?: string,
    public platforms?: string[],
    public coverUrl?: string,
    public developer?: string,
    public releaseYear?: number,
  ) {}
}
