import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import {useSelector} from "react-redux";
import {Box, createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {AuthState} from "./state/types/AuthState";
import themeSettings from "./theme";
import {useMemo} from "react";
import TopBar from "./scenes/navbar";
import {NavigationState} from "./state/types/NavigationState";
import {frFR} from '@mui/x-date-pickers/locales';
import CategoryPage from "./scenes/categoryPage";
import SubjectPage from "./scenes/subjectPage";

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
                    <TopBar/>
                    <Box id="content" sx={{...isNonMobileScreen && {paddingX: '180px'}}} className={contentClasses}>
                        <Routes>
                            <Route path="/" element={<HomePage/>}></Route>
                            <Route path="/login" element={<LoginPage/>}></Route>
                            <Route path="/profile" element={<ProfilePage/>}></Route>
                            <Route path="/category/:category" element={<CategoryPage/>}></Route>
                            <Route path="/category/:category/subject/:subjectId" element={<SubjectPage/>}></Route>
                        </Routes>
                    </Box>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
