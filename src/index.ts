import { User } from './global/user';
import { Message } from './global/message';
import * as db from './global/database';
import * as debug from './global/debug';

// Put all executed code in here so that they execute in proper order.
async function main(): Promise<any> {
  await db.clearUsers();

  await db.newUser(
    new User({
      id: db.getNewUserID(),
      name: 'Sebastian Mandal',
      email: 'sebastian.mandal@icloud.com',
      key: 'private_login_key'
    })
  )
  
  let user = new User(await db.loginUserFromID(0));
  await user.sendMessage('Hello world!');

  await db.readDatabase()
    .then(result => console.log(result));
  
  return;
}

main();