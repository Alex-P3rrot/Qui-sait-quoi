import {createSlice, Slice} from "@reduxjs/toolkit";
import {initialAuthState} from "./types/initialAuthState";
import {Post} from "../models/Post";

const initialState: initialAuthState = {
    mode: 'light',
    user: null,
    posts: []
};

export const authSlice: Slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state): void => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setLogin: (state, action) => {
            state.user = action.payload.user
        },
        setLogout: (state) => {
            state.user = null
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            state.posts = state.posts.map((post: Post) => {
                if (post.id === action.payload.post_id) return action.payload.post;
                return post
            })
        }
    }
})


export const {
    setMode,
    setLogin,
    setLogout,
    setPosts,
    setPost
} = authSlice.actions;
export default authSlice.reducer;