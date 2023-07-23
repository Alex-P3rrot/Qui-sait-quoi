import {AuthForm} from "./AuthForm";
import {useMediaQuery} from "@mui/material";
import {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

const LoginPage = () => {
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
    const [pageType, setPageType] = useState('login')

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <AuthForm pageType={pageType} setPageType={setPageType} isNonMobileScreen={isNonMobileScreen}/>
        </LocalizationProvider>
    )
}

export default LoginPage;