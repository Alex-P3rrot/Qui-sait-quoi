import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {AuthForm} from "../scenes/loginPage/AuthForm";
import {useEffect, useState} from "react";

function FormTestComponent(props: any) {
    const [pageType, setPageType] = useState('login')
    useEffect(() => {
        (() => {
            if (props.hasOwnProperty('pageType')) setPageType(props.pageType)
        })()
    }, [])
    const login = () => {}
    const register = () => {}
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <AuthForm pageType={pageType} setPageType={setPageType} isNonMobileScreen={true} login={login} register={register}/>
        </LocalizationProvider>
    )
}

test('Render login form', () => {
    render(
        <FormTestComponent/>
    );
    const buttonElement: HTMLButtonElement = screen.getByText(/Don't have an account\? Sign Up here./i);
    expect(buttonElement).toBeInTheDocument();
})

test('Toggle form to register', async () => {
    render(
        <FormTestComponent/>
    );
    const toggleFormBtn: HTMLButtonElement = screen.getByText(/Don't have an account\? Sign Up here./i)

    function triggerClickToggleFormBtn() {
        userEvent.click(toggleFormBtn)
    }

    await act((): void => triggerClickToggleFormBtn())
    expect(await screen.findByText('REGISTER')).toBeInTheDocument();
})

test('Check required input form register', async () => {
    render(
        <FormTestComponent pageType='register'/>
    );
    const btnSendForm: HTMLButtonElement = await screen.findByText('REGISTER')
    function triggerClickBtnSendForm () {
        userEvent.click(btnSendForm)
    }
    await act((): void => triggerClickBtnSendForm())
    expect(await screen.findByText('email is a required field')).toBeInTheDocument()
    expect(await screen.findByText('birthdate is a required field')).toBeInTheDocument()
    expect(await screen.findByText('username is a required field')).toBeInTheDocument()
    expect(await screen.findByText('password is a required field')).toBeInTheDocument()
})