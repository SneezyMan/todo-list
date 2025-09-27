import { openDb } from '../data.js';
import { isValidName, isValidPasswordChars } from '../helper.js';
import EmailValidator from "email-validator";
import { HttpError } from '../misc.js';

// Creates new user and logs in as the user if successful
export async function AuthUserRegister(nameFirst: string, nameLast: string, email: string, password: string) {
  const db = await openDb();
  db.exec(`
    CREATE TABLE if NOT EXISTS Users (
      userId INTEGER PRIMARY KEY AUTOINCREMENT, 
      nameFirst String, 
      nameLast TEXT, 
      email TEXT, 
      password TEXT
    )
  `);

  if (!isValidName(nameFirst)) {
    throw new HttpError(400, 'nameFirst is invalid');
  }
  if (!isValidName(nameLast)) {
    throw new HttpError(400, 'nameLast is invalid');
  }

  if (!EmailValidator.validate(email)) {
    throw new HttpError(400, 'email is invalid');
  }
  const row = await db.get(`SELECT * FROM Users WHERE email = ?`, [email]);
  if (row) {
    throw new HttpError(400, 'email already exists');
  }

  if (password.length < 8) {
    throw new HttpError(400, 'password is less than 8 characters');
  }
  if (!isValidPasswordChars(password)) {
    throw new HttpError(400, 'password is missing alphabets, numbers, or special characters');
  }

  const result = await db.run('INSERT INTO Users (nameFirst, nameLast, email, password)' +
    ' VALUES (?, ?, ?, ?)', [nameFirst, nameLast, email, password]);
  return result.lastID;
}