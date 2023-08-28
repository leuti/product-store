export class User {
  id?: number;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor() {
    this.id = 1;
    this.login = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }
}
