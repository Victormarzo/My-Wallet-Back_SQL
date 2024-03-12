import { User,Session,Transaction } from "@prisma/client";
import {Request} from "express";
export type CreateUser = Omit <User, "createdAt" | "updatedAt" | "id" >;
export type LogUser =  Omit <User, "createdAt" | "updatedAt" | "id" | "name" >;
export type NewSession = Omit <Session, "createdAt" | "updatedAt"| "id">;
export type ApplicationError = {
    name: string;
    message: string;
};
export type JWTPayload = {
    userId: number
};
export type AuthenticatedRequest = Request & JWTPayload;
export type NewTransaction = Omit <Transaction, "createdAt" | "updatedAt" | "id">;
export type UpdateTransaction = Omit <Transaction, "createdAt" | "updatedAt">;