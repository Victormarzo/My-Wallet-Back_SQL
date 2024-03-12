import { ApplicationError } from "./protocols";

export function loginError(message: string): ApplicationError {
    return {
        name: "loginError",
        message
    };
}

export function notFoundError(message: string): ApplicationError {
    return {
        name: "NotFoundError",
        message
    };
}

export function unauthorizedError(message: string): ApplicationError {
    return {
        name: "UnauthorizedError",
        message
    };
}

export function conflictError(message: string): ApplicationError {
    return {
        name: "ConflictError",
        message
    };
}
