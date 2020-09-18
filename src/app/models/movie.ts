export enum CategoryTypes {
    Action = 0,
    Drama = 1,
    Comedy = 2,
    Other = 3
} 

export class Movie {
    name: string;
    category: CategoryTypes;
    link: string;
    poster: string;
}