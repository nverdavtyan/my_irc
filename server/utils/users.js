const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Stock in a variable if there is a user already connected with a name that an another want to have
  const ifExistingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  // Using the variable in a if for handling the error
  if (ifExistingUser) {
    return { error: "Username is already taken. Please choose another" };
  }

  // Handling the empty field
   if (!name || !room) return { error: "Username and room are required." };

  // If the name is not taken, push in the user's array
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  // if the user's id is equal to the specific id
  const index = users.findIndex((user) => user.id === id);

  // Splice from that specific index and removing from the array
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// if user.id === id (if he exists, it will return it)
const getUser = (id) => users.find((user) => user.id === id);

// it will returns the users from the room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);


module.exports = { addUser, removeUser, getUser, getUsersInRoom };
