import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import {useSelector} from "react-redux";
import {Box, createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {AuthState} from "./state/types/AuthState";
import themeSettings from "./theme";
import {useMemo} from "react";
import Sidebar from "./scenes/sidebar";
import {NavigationState} from "./state/types/NavigationState";
import {frFR} from '@mui/x-date-pickers/locales';

function App() {
    const mode: string = useSelector((authState: AuthState) => authState.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode), frFR), [mode])
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
    const isMenuRightToggled = useSelector(({navigationState}: {
        navigationState: NavigationState
    }) => navigationState.isMenuRightToggled)
    const isMenuLeftToggled = useSelector(({navigationState}: {
        navigationState: NavigationState
    }) => navigationState.isMenuLeftToggled)
    const contentClasses = useMemo((): string | undefined => {
        if (isMenuLeftToggled) {
            return 'menuLeftActive'
        }
        if (isMenuRightToggled) {
            return 'menuRightActive'
        }
    }, [isMenuLeftToggled, isMenuRightToggled])

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Sidebar/>
                    <Box sx={{
                        ...isNonMobileScreen && {marginX: '150px'}, ...{
                            paddingX: 2,
                            paddingTop: 2,
                            backgroundColor: '#fff',
                        }
                    }} className={contentClasses}>
                        <Routes>
                            <Route path="/" element={<HomePage/>}></Route>
                            <Route path="/login" element={<LoginPage/>}></Route>
                            <Route path="/profile" element={<ProfilePage/>}></Route>
                        </Routes>
                    </Box>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
