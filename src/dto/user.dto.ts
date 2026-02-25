import type { usersTable } from "../db/schema.js";

export type SelectUser = typeof usersTable.$inferSelect;

class UserDTO {
    readonly id: number;
    readonly email: string;

    constructor(user: SelectUser) {
        this.id = user.id;
        this.email = user.email;
    }
}

export default UserDTO;