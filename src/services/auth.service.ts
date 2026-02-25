import { usersTable } from '../db/schema.js';
import { db } from '../index.js';

const authService = {
    signUp: async (email: string, password: string) => {
        const user: typeof usersTable.$inferInsert = {
            email,
            password,
        };

        const fields = await db.insert(usersTable)
            .values(user)
            .returning();
            
        return fields; 
    },
    login: async () => {        
        return;
    }
}

export default authService;