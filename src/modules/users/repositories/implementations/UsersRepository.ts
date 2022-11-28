import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    const created_at = new Date();

    Object.assign(user, { name, email, created_at });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const userFound = this.users.find((user) => user.id === id);
    return userFound;
  }

  findByEmail(email: string): User | undefined {
    const userFound = this.users.find((user) => user.email === email);
    return userFound;
  }

  turnAdmin(receivedUser: User): User {
    const admin = true;
    const updated_at = new Date();

    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    return Object.assign(this.users[userIndex], { admin, updated_at });
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
