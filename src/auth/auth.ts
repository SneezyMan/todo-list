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
  db.exec(`
    Create Table if NOT EXISTS Sessions (
    sessionId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    createdAt INTEGER
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
  const timestamp = Date.now();
  const session = await db.run('INSERT INTO Sessions(userId, createdAt) VALUES (?, ?)',
    [result.lastID, timestamp]);

  return session.lastID;
}

// Logs in if email and password match and user isn't logged in
export async function AuthUserLogin(email: string, password: string) {
  const db = await openDb();
  const user = await db.get(`SELECT * FROM Users WHERE email = ?`, [email]);
  if (!user) {
    throw new HttpError(401, 'account with email does not exist');
  }

  if (user.password != password) {
    throw new HttpError(401, 'password is incorrect');
  }

  let session = await db.get(`SELECT * FROM Sessions WHERE userId = ?`, [user.userId]);
  if (session) {
    throw new HttpError(400, 'user is already logged in');
  } else {
    const timestamp = Date.now();
    session = await db.run('INSERT INTO Sessions(userId, createdAt) VALUES (?, ?)',
    [user.userId, timestamp]);
  }

  return session.lastID;
}

// Logs user out
export async function AuthUserLogout(sessionId: number) {
  const db = await openDb();
  const result = await db.run('DELETE FROM Sessions WHERE sessionId = ?', [sessionId]);
  if (result.changes === 0) {
    throw new HttpError(400, 'user is already logged out');
  }

  return {};
}