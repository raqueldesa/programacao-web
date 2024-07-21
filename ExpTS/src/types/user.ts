import { User } from "@prisma/client";

export type UserCreateDto = Pick<User, "name" | "email" | "password">;
