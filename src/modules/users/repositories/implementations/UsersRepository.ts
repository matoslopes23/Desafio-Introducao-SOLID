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
      Object.assign(user, {
        name,
        email,
        created_at: new Date(),
        updated_at: new Date()

      });
      this.users.push(user);

      return user;
      
  }

  findById(id: string): User | undefined {
    const user = this.users.find(user => user.id === id);
    return user
  }

  findByEmail(email: string): User | undefined {
      const user = this.users.find(user => user.email === email);
      return user
  }

  turnAdmin(receivedUser: User): User {
    const userUpdated = {
      ...receivedUser,
      admin:true,
      upadated_at: new Date()
    }

    const UsersRepositoryIndex = this.users.findIndex(user => user.id === receivedUser.id)
    
    this.users[UsersRepositoryIndex] = userUpdated;

    return userUpdated;
  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository };
