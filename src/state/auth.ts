import {User} from "../models/User";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export type AuthStateType = {
    isUserLoggedIn: boolean,
    user: User | null,
    setIsUSerLoggedIn: (value: boolean) => void,
    setUser: (value: User | null) => void
}

export const useAuthState = create<AuthStateType>()(
    persist(
        (set) => ({
            isUserLoggedIn: false,
            user: null,
            setIsUSerLoggedIn: (value) => set((state) => ({isUserLoggedIn: value})),
            setUser: (value: User | null) => set((state) => ({user: value}))
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)