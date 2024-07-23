import { User } from "@prisma/client";

export type CreateUserDto = Pick<
  User,
  "name" | "email" | "password" | "majorId"
>;
