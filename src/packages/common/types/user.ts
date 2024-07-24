import { User } from "@prisma/client";

export type UserType = User & { position: number };
