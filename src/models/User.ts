import {Post} from "./Post";

export type User = {
    id: number,
    email: string,
    username: string,
    password: string,
    posts: Array<Post>
}