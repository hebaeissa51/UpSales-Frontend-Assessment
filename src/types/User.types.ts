export type UserTypes = {
    id: number;
    name: string;
    email: string;
    password?: string;
}

export type LoginTypes = {
    email: string;
    password: string;
}