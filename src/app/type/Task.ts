export interface Task{
    id?:number;
    date_debut:Date;
    date_fin:Date;
    status?:string;
    label:string;
    description:string
}