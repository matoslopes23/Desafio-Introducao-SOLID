import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const {email, name} = request.body;
    try {
      const user = this.createUserUseCase.execute({email, name});
      return response.status(201).send(user);
    } catch (error) {
      return response.status(400).json({error: error.message})
    }
  }
}

export { CreateUserController };
