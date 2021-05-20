import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id}: IRequest): User[] {
    const userExist = this.usersRepository.findById(user_id);
    if(!userExist){
      throw new Error("User alread Exist")
    }
    if(!userExist.admin){
      throw new Error("Admin Alread Exist")
    }
    const user = this.usersRepository.list();
    
    return user;
  }
}

export { ListAllUsersUseCase };
