import { openDb } from '../data.js'



// Creates new user and logs in as the user if successful
async function AuthUserRegister(nameFirst: string, nameLast: string, email: string, password: string) {
  const db = await openDb();
  db.exec('CREATE TABLE if NOT EXISTS Users (userId INTEGER PRIMARY KEY AUTOINCREMENT, nameFirst TEXT, nameLast TEXT, email TEXT, password TEXT)');
  

}

export default AuthUserRegister;