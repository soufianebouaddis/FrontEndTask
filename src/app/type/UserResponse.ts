import { Task } from "./Task";

export interface UserResponse{
    id?:number;
    nom:string;
    prenom:string;
    email:string;
    password:string;
    username:string;
    task:Task[];
}