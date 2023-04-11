const { expect } = require('chai');
const app = require('../index').app;
const User = require('../src/users');

describe('User', () => {
  describe('create', () => {
    it('should create a new user', async () => {
      const user = await User.createUser({ name: 'Han Solo', email: 'hansolo@example.com' });
      expect(user).to.have.include({ id: 1, name: 'Han Solo', email: 'hansolo@example.com' });
    });
  });

  describe('read', () => {
    it('should return all users', async () => {
      const users = await User.getAllUsers();
      expect(users).to.be.an('array');
    });

    it('should return a user by id', async () => {
      const user = await User.createUser({ name: '', email: 'Klaus.hargreeves@example.com' });
      const foundUser = await User.getUserById(user.id);
      expect(foundUser).to.include({ name: 'Klaus', email: 'Klaus.hargreeves@example.com' });
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const user = await User.createUser({ name: 'Quentin Beck', email: 'quentin.beck@example.com' });
      const updatedUser = await User.updateUser(user.id, { name: 'Mysterio' });
      expect(updatedUser).to.include({ name: 'Mysterio', email: 'quentin.beck@example.com' });
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      const user = await User.createUser({ name: 'John Wick', email: 'johnathanwick@example.com' });
      await User.deleteUser(user.id);
      const deletedUser = await User.getUserById(user.id);
      expect(deletedUser).to.be.undefined;
    });
  });
});