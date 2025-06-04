export class JwtService {
  sign(payload: any): string {
    return 'token';
  }
  verify(token: string): any {
    return { sub: '', email: '' };
  }
}
