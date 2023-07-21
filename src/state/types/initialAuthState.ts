import {Post} from "../../models/Post";
import {User} from "../../models/User";

export type initialAuthState = {
    mode: string,
    user: User|null,
    posts: Array<Post>
}