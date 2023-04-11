let users = [
    { id: 1, name: 'John Wick', email: 'johnathanwick@example.com' },
    { id: 2, name: 'Jane Foster', email: 'drjane@example.com' },
  ];

  function getAllUsers() {
    return users;
  }
  
  function createUser(name, email) {
    const id = users.length + 1;
    const user = { id, name, email };
    users.push(user);
    return user;
  }
  
  function getUserById(id) {
    return users.find(user => user.id === parseInt(id));
  }
  
  function updateUser(id, name, email, fullName, phoneNumber, dateOfBirth, age ) {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index !== -1) {
      users[index].name = name;
      users[index].email = email;
      users[index].fullName = fullName;
      users[index].phoneNumber = phoneNumber;
      users[index].dateOfBirth = dateOfBirth;
      users[index].age = age;
      return users[index];
    } else {
      return null;
    }
  }
  
  function deleteUser(id) {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index !== -1) {
      return users.splice(index, 1)[0];
    } else {
      return null;
    }
  }
  
  module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
  };
  