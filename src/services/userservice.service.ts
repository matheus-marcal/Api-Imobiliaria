
export class UserService {
  constructor() {

  }
  criptografarsenha(senha: string): string {
    return `${senha}banana`
  }
  login(passwordbd: string, passwordfront: string): boolean {
    if (passwordbd === passwordfront)
      return true
    else
      return false
  }
}
