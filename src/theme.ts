import {createContext, useMemo, useState} from "react";
import {createTheme, Theme} from "@mui/material";

export const themeSettings = (mode: string) => {
    return {
        mode,
        palette: {
            ...(mode === 'dark' ?
                    {
                        primary: {
                            50: '#C0CCD9',
                            100: '#A5B8CF',
                            200: '#6A96CA',
                            300: '#4886D0',
                            400: '#2178DD',
                            500: '#096BDE',
                            600: '#1B62B5',
                            700: '#265995',
                            800: '#2F4968',
                            900: '#2F3C4C',
                        },
                    }
                    :
                    {
                        primary: {
                            50: '#d9cec0',
                            100: '#cfb8a5',
                            200: '#caa46a',
                            300: '#d09548',
                            400: '#dd9221',
                            500: '#de7b09',
                            600: '#b56d1b',
                            700: '#955e26',
                            800: '#68492f',
                            900: '#4c3b2f',
                        },
                    }
            )
        },
    }
};

export type ColorModeContextType = {
    toggleColorMode: () => void
}

export const ColorModeContext = createContext<ColorModeContextType>({
    toggleColorMode: () => {}
})

export const useMode = () => {
    const [mode, setMode] = useState('light')

    const colorMode = useMemo<ColorModeContextType>(() => ({
        toggleColorMode: () => setMode(prev => (prev === 'dark' ? 'light' : 'dark')),
    }), [])

    const theme = useMemo<Theme>(() => createTheme(themeSettings(mode)), [mode])

    return [theme, colorMode]
}