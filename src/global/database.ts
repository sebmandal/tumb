// Imports

import { User } from './user';
import { Message } from './message';
import fs from 'fs-extra';

// Interacting with database

export async function writeDatabase(data: any): Promise<any> {
  return await fs.writeFile('./db/data.json', JSON.stringify(data, null, 2));
}

export async function readDatabase(): Promise<any> {
  return await fs.readJson('./db/data.json');
}

// Fetching database info

export async function fetchUserID(user: User): Promise<number> {
  let userID: number = 0;
  let data = await readDatabase();
  data.users.forEach((temp_user: User) => {
    if (temp_user == user) {
      return userID;
    } else {
      userID++;
    }
  })
  return userID;
}

export async function fetchUserAmount(): Promise<number> {
  let user_amount = await readDatabase().then(result => {
    return result.users.length;
  });
  return user_amount;
}

// Adding / changing users

export async function newUser(user: User): Promise<any> {
  let data = await readDatabase();
  user.id = data.users.length;
  data.users = [...data.users, user];
  await writeDatabase(data);
  return;
}

export async function updateUser(user: User): Promise<any> {
  let data = await readDatabase();
  data.users[user.id] = user;
  return await writeDatabase(data);
}

export async function getNewUserID(): Promise<number> {
  let user_amount = await readDatabase().then(result => {
    return result.users.length;
  });
  return user_amount;
}

export async function clearUsers(): Promise<any> {
  let data = await readDatabase();
  data.users = [];
  await writeDatabase(data);
  return;
}

// Login

export async function loginUserFromID(userID: number): Promise<any> {
  let data = await readDatabase();
  let user_data: any = { name: 'User not found.' };
  data.users.forEach((user: any) => {
    if (user.id == userID) {
      user_data = { id: userID, name: user.name, email: user.email, key: user.key }
    }
  })
  return user_data;
}