import {AuthForm} from "./AuthForm";
import {useMediaQuery} from "@mui/material";
import {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import FlexBox from "../../components/FlexBox";

const LoginPage = () => {
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
    const [pageType, setPageType] = useState('login')

    return (
        <FlexBox justifyContent="center" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <AuthForm pageType={pageType} setPageType={setPageType} isNonMobileScreen={isNonMobileScreen}/>
            </LocalizationProvider>
        </FlexBox>
    )
}

export default LoginPage;