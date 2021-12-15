import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '../../../services/CreateUserService';
import ShowUserService from '../../../services/ShowUserService';
import UpdateUserService from '../../../services/UpdateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import ListUsersService from '../../../services/ListUsersService';

class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const showUserService = container.resolve(ListUsersService);

    const user = await showUserService.execute();

    return res.json(classToClass(user));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return res.json(classToClass(user));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.params.id;
    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({
      user_id,
    });

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, old_password, password } = req.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    return res.json(classToClass(user));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.params.id;

    const deleteUserService = container.resolve(DeleteUserService);

    const user = await deleteUserService.execute({
      user_id,
    });

    return res.json(classToClass(user));
  }
}

export default UsersController;
