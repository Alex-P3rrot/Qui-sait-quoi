import {AuthForm} from "./AuthForm";
import {useMediaQuery} from "@mui/material";
import {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import FlexBox from "../../components/FlexBox";
import {FormikValues} from "formik";
import {useAuthState} from "../../state/auth";
import {User} from "../../models/User";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
    const [pageType, setPageType] = useState('login')
    const navigate = useNavigate()
    const authState = useAuthState()
    async function login(values: FormikValues) {
        if (authState.user) {
            authState.setIsUSerLoggedIn(values.username === authState.user.username && values.password === authState.user.password)
            await navigate('/')
        } else {
            console.log(values)
            console.log(authState.user)
        }
    }
    async function register(values: User) {
        authState.setUser(values)
        setPageType('login')
    }

    return (
        <FlexBox justifyContent="center" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <AuthForm pageType={pageType} setPageType={setPageType} isNonMobileScreen={isNonMobileScreen} login={login} register={register}/>
            </LocalizationProvider>
        </FlexBox>
    )
}

export default LoginPage;