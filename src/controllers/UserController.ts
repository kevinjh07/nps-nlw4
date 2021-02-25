import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    const repository = getRepository(User);

    const userExists = await repository.findOne({ email });

    if (userExists) {
      return response.status(422).json({ error: "User already exists!" });
    }

    const user = repository.create({
      name,
      email,
    });

    await repository.save(user);

    return response.status(201).json({ user });
  }
}
