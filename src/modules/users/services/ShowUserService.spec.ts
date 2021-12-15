import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowUserService from './ShowUserService';

let fakeUsersRepository: FakeUsersRepository;
let showUser: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUser = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '654987321',
    });

    const profile = await showUser.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@email.com');
  });

  it('should not be able to show a profile of a non-existent user', async () => {
    await expect(
      showUser.execute({
        user_id: 'non-existent',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
