import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsersService: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsersService = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '654987321',
    });

    const profile = await listUsersService.execute();

    expect.arrayContaining([profile]);
  });
});
