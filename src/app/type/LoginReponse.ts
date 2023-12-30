import { User } from "./User";

export interface LoginResponse{
    user:User;
    accesstoken:string;
    refreshToken:string;
}