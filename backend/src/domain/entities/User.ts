export class User {
  constructor(
    public id: number | null,
    public name: string,
    public email: string,
    public password?: string,
    public status: boolean = true,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  static create(name: string, email: string, password: string): User {
    const now = new Date();
    return new User(null, name, email, password, true, now, now);
  }

  update(name: string, email: string): void {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.status = false;
    this.updatedAt = new Date();
  }
}

