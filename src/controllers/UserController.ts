import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    const repository = getCustomRepository(UserRepository);

    const userExists = await repository.findOne({ email });

    if (userExists) {
      return response.status(422).json({ error: "User already exists!" });
    }

    const user = repository.create({
      name,
      email,
    });

    await repository.save(user);

    return response.status(201).json(user);
  }
}
