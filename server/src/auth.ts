import { isEmailValid } from "@hapi/address";
import { getData } from "./datastore";
import { User } from "./interface";

/**
 * <Register a user with an email, password, first name, and last name,
 *  and returns the userId for the registered user.>
 * 
 * @param {string} email - email for user
 * @param {string} password - password for user
 * @param {string} nameFirst - first name of user
 * @param {string} nameLast - last name of user
 * 
 * @returns {number} userId - number which corresponds to a user
 */
export function AuthRegister(email: string, password: string, nameFirst: string, nameLast: string
): { userId: number } {

  if (!isEmailValid(email)) {
    throw new Error("Email is invalid");
  }

  const data = getData();
  if (data.users.find((user) => user.email === email)) {
    throw new Error("Email is already in use");
  }

  if (password.length < 8) {
    throw new Error("Password is too short");
  }

  const validChars = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&+=]).*$/
  if (!validChars.test(password)) {
    throw new Error("Password does not contain necessary characters");
  }

  const nameChars = /^[A-Za-z]+$/
  if (!nameChars.test(nameFirst)) {
    throw new Error("First name contains invalid characters");
  }
  if (!nameChars.test(nameLast)) {
    throw new Error("Last name contains invalid characters");
  }

  const userId = data.users.length;
  const user: User = {
    userId,
    email,
    password,
    nameFirst,
    nameLast,
  }
  data.users.push(user);
  
  return { userId: userId };
}
