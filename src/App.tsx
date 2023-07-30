import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import {Box, CssBaseline, Theme, ThemeProvider, useMediaQuery} from "@mui/material";
import {ColorModeContext, useMode, ColorModeContextType} from "./theme";
import {useMemo} from "react";
import NavBar from "./scenes/navbar";
import CategoryPage from "./scenes/categoryPage";
import SubjectPage from "./scenes/subjectPage";
import {useNavbarState} from "./state/navbar";

function App() {
    const [theme, colorMode] = useMode() as [Theme, ColorModeContextType]
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
    const navbarState = useNavbarState()
    const isMenuLeftToggled = navbarState.isMenuLeftToggled
    const isMenuRightToggled = navbarState.isMenuRightToggled
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
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <NavBar/>
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
                </ColorModeContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
