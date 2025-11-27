export class User {
  constructor(
    public id: number | null,
    public name: string,
    public email: string,
    public password?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  static create(name: string, email: string, password: string): User {
    const now = new Date();
    return new User(null, name, email, password, now, now);
  }

  update(name: string, email: string): void {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date();
  }
}

