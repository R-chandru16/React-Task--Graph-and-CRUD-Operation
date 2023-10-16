// Userservice.js

// Import user data from Enduser.json
import userData from '../LoginPage/Enduser.json';

// Function to get all users
export function getUsers() {
  return userData;
}

// Function to add a new user
export function addUser(user) {
  userData.push(user);
  // You can also update localStorage here if needed
}

// Function to update a user's data (you can implement your logic here)
export function updateUser(updatedUser) {
  const index = userData.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) {
    // Update the user's data in userData array
    userData[index] = updatedUser;
    // You can also update localStorage here if needed
  }
}

// Add any other user-related functions here
// For example, you can implement functions to delete users, fetch a single user by ID, etc.
