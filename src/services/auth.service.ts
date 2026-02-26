import { eq } from 'drizzle-orm';
import { usersTable } from '../db/schema.js';
import { db } from '../index.js';

const authService = {
    signUp: async (email: string, password: string) => {
        const user: typeof usersTable.$inferInsert = {
            email,
            password,
        };

        const [createdUser] = await db.insert(usersTable)
            .values(user)
            .returning();

        if (!createdUser) {
            throw new Error("Failed to create user");
        }

        return createdUser; 
    },
    findUserByEmail: async (email: string) => {
        const user = await db.select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1);
        
        if (user.length === 0) {
            return null;
        }

        return user[0]!;
    },
}

export default authService;