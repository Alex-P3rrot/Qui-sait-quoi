import {create} from "zustand";

type NavbarStateType = {
    isMenuLeftToggled: boolean,
    isMenuRightToggled: boolean,
    setIsMenuRightToggled: (value: boolean) => void,
    setIsMenuLeftToggled: (value: boolean) => void
}

export const useNavbarState = create<NavbarStateType>()((set) => ({
    isMenuLeftToggled: false,
    isMenuRightToggled: false,
    setIsMenuRightToggled: (value) => set((state) => ({isMenuRightToggled: value})),
    setIsMenuLeftToggled: (value) => set((state) => ({isMenuLeftToggled: value})),
}))