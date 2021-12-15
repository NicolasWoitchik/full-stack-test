import { uuid } from 'uuidv4';

import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async list(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.users.find(item => item.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.users.find(item => item.email === email);
    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, data);

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(item => item.id === user.id);

    this.users[findIndex] = Object.assign(user, { id: uuid() }, user);

    return user;
  }

  public async delete(user: User): Promise<boolean> {
    const findIndex = this.users.findIndex(item => item.id === user.id);

    this.users.splice(findIndex);

    return true;
  }
}

export default FakeUsersRepository;
