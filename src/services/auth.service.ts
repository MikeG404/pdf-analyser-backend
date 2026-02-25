import { usersTable } from '../db/schema.js';
import { db } from '../index.js';

// type UserType = {
//     id: number,
//     email: string,
//     password: string
// }

const authService = {
    signUp: async (email: string, password: string) => {
        const user: typeof usersTable.$inferInsert = {
            email,
            password,
        };

        await db.insert(usersTable).values(user);
        console.log("user created");
        
    },
    login: async () => {        
        return;
    }
}

export default authService;