import {Post} from "./Post";

export type User = {
    id: number,
    email: string,
    username: string,
    password: string,
    picture: string|null,
    birthDate: Date|null,
    location: string|null,
    posts: Array<Post|null>
}