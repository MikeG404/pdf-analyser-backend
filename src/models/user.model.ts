import * as z from "zod"; 

const UserModel = z.object({
    email: z.email(),
    password: z.string().min(9).max(20),
})

export default UserModel;