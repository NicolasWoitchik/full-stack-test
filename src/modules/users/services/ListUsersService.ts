import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(): Promise<User[]> {
    const user = await this.usersRepository.list();

    return user;
  }
}

export default ListUsersService;
