import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import {useSelector} from "react-redux";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {initialAuthState} from "./state/types/initialAuthState";
import themeSettings from "./theme";
import {useMemo} from "react";
import LeftBar from "./scenes/sidebar/LeftBar";
import RightBar from "./scenes/sidebar/RightBar";

function App() {
    const mode: string = useSelector((state: initialAuthState) => state.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <LeftBar/>
                    <RightBar/>
                    <Box sx={{marginX: '150px', paddingX:2, backgroundColor: '#fff', height: '100%'}}>
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
